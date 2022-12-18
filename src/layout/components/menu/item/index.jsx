import React from "react";
import { useLocation, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Menu, Tag } from "antd";

import navigation from "../../../../navigation/vertical";
import { useState, useEffect } from "react";
import { usePermissionContext } from "../../../../context/PermissionContext";

const { SubMenu } = Menu;

const navFiltering = (permission, navigation, setFilteredNaviation, type) => {
  const filteredNav = [];
  for (let nav of navigation) {
    if (
      (nav.hasOwnProperty("header") && type === nav?.type) ||
      (nav?.id == "dashboard" && type == 1) ||
      (nav?.id == "wo-dashboard" && type == 3)
    )
      filteredNav.push(nav);
    else if (nav.hasOwnProperty("navLink") && permission.includes(nav.navLink))
      filteredNav.push(nav);
    else if (nav.hasOwnProperty("children")) {
      let childrenNav = [];
      for (const child of nav.children) {
        permission.includes(child.navLink)
          ? childrenNav.push(child)
          : undefined;
      }
      childrenNav.length
        ? filteredNav.push({ ...nav, children: childrenNav })
        : undefined;
    }
  }
  setFilteredNaviation(filteredNav);
};

export default function MenuItem(props) {
  const { onClose } = props;

  // Redux
  const customise = useSelector((state) => state.customise);

  // Location
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

  // Menu
  const splitLocationUrl =
    splitLocation[splitLocation.length - 2] +
    "/" +
    splitLocation[splitLocation.length - 1];

  const { permission, type } = usePermissionContext();
  const [filteredNavigation, setFilteredNaviation] = useState([]);

  useEffect(() => {
    if (permission.length) {
      navFiltering(permission, navigation, setFilteredNaviation, type);
    }
  }, [permission]);

  const menuItem = filteredNavigation?.map((item, index) => {
    if (item.header) {
      return (
        <Menu.ItemGroup
          className="collapsible-sider-title"
          key={index}
          title={item.header}
        ></Menu.ItemGroup>
      );
    }

    if (item.children) {
      return (
        <SubMenu key={item.id} icon={item.icon} title={item.title}>
          {item.children.map((itemChildren, index) => {
            if (!itemChildren.children) {
              const childrenNavLink = itemChildren.navLink.split("/");

              return (
                // Level 2
                <Menu.Item
                  key={itemChildren.id}
                  className={
                    splitLocationUrl ===
                    childrenNavLink[childrenNavLink.length - 2] +
                      "/" +
                      childrenNavLink[childrenNavLink.length - 1]
                      ? "ant-menu-item-selected"
                      : "ant-menu-item-selected-in-active"
                  }
                  onClick={onClose}
                >
                  <Link to={itemChildren.navLink}>{itemChildren.title}</Link>
                </Menu.Item>
              );
            } else {
              return (
                // Level 3
                <SubMenu key={itemChildren.id} title={itemChildren.title}>
                  {itemChildren.children.map((childItem, index) => {
                    const childrenItemLink = childItem.navLink.split("/");

                    return (
                      <Menu.Item
                        key={childItem.id}
                        className={
                          splitLocationUrl ===
                          childrenItemLink[childrenItemLink.length - 2] +
                            "/" +
                            childrenItemLink[childrenItemLink.length - 1]
                            ? "ant-menu-item-selected"
                            : "ant-menu-item-selected-in-active"
                        }
                        onClick={onClose}
                      >
                        <Link to={childItem.navLink}>{childItem.title}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            }
          })}
        </SubMenu>
      );
    } else {
      const itemNavLink = item.navLink ? item.navLink.split("/") : "";

      return (
        // Level 1
        <Menu.Item
          key={item.id}
          icon={item.icon}
          onClick={onClose}
          className={
            splitLocation[splitLocation.length - 2] +
              "/" +
              splitLocation[splitLocation.length - 1] ===
            itemNavLink[itemNavLink.length - 2] +
              "/" +
              itemNavLink[itemNavLink.length - 1]
              ? "ant-menu-item-selected"
              : "ant-menu-item-selected-in-active"
          }
          style={item.tag && { pointerEvents: "none" }}
        >
          {item.tag ? (
            <a
              href="#"
              className="hp-d-flex hp-align-items-center hp-d-flex-between"
            >
              <span>{item.title}</span>
              <Tag
                className="hp-mr-0 hp-border-none hp-text-color-black-100 hp-bg-success-3 hp-border-radius-full hp-px-8"
                style={{ marginRight: -14 }}
              >
                {item.tag}
              </Tag>
            </a>
          ) : (
            <Link to={item.navLink}>{item.title}</Link>
          )}
        </Menu.Item>
      );
    }
  });

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={[
        splitLocation.length === 5
          ? splitLocation[splitLocation.length - 3]
          : null,
        splitLocation[splitLocation.length - 2],
      ]}
      theme={customise.theme == "light" ? "light" : "dark"}
      // className="hp-bg-black-20 hp-bg-dark-90"
    >
      {menuItem}
    </Menu>
  );
}
