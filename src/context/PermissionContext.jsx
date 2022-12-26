import axios from "axios";
import React, { createContext, useContext } from "react";
import { useState } from "react";
import { api } from "../configs/apiConfig";

const PermissionContext = createContext();

export const PermissionContextProvider = ({ children }) => {
  const [permission, setPermission] = useState([]);
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [type, setType] = useState(null);

  const accessableMenus = (roles, menus) => {
    const permissionsId = roles.data.data.access_menu_items.map(
      (id) => id.sub_menu_id
    );

    const navigationMenu = [];

    for (const menu of menus.data.data) {
      for (const sub_menu of menu.sub_menus) {
        if (permissionsId.includes(sub_menu.id)) {
          navigationMenu.push(sub_menu.route);
          navigationMenu.includes(menu.route)
            ? undefined
            : navigationMenu.push(menu.route);
        }
      }
    }

    return navigationMenu;
  };

  const fetchApi = () => {
    setPermissionLoading(true);
    api
      .get("users/" + localStorage.getItem("id"))
      .then((res) => {
        setType(res.data.data.type);

        const getRoles = api.get(
          "access-menus/" + res.data.data.access_menu_id,
          {
            timeout: 3000,
          }
        );

        const getMenus = api.get("menus", {
          timeout: 3000,
        });

        axios
          .all([getRoles, getMenus])
          .then(
            axios.spread((...allResponse) => {
              setPermission(accessableMenus(allResponse[0], allResponse[1]));
            })
          )
          .catch((err) => console.log("Error menu/role"))
          .finally(() => setPermissionLoading(() => false));
      })
      .catch((err) => {
        if (err.response.data.message == "Unauthenticated.") {
          localStorage.removeItem("id");
          localStorage.removeItem("token");
        }
        console.log("Error user");
        setPermissionLoading(() => false);
      });
  };

  const logOut = () => {
    setPermission([]);
  };

  return (
    <PermissionContext.Provider
      value={{
        permission,
        setPermission,
        fetchApi,
        logOut,
        type,
        permissionLoading,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => useContext(PermissionContext);
