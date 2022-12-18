import { Suspense, useEffect, useState } from "react";

// Motion
import { motion } from "framer-motion/dist/framer-motion";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../redux/customise/customiseActions";

// Router
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";

// Routes
import { Routes } from "./admin-routes";
import { WoRoutes } from "./wo-routes";
import { GlobalRoutes } from "./global-routes";

// Layouts
import VerticalLayout from "../layout/VerticalLayout";
import HorizontalLayout from "../layout/HorizontalLayout";
import FullLayout from "../layout/FullLayout";

// Components
import Home from "../view/home";
import Error404 from "../view/pages/errors/404";
import { usePermissionContext } from "../context/PermissionContext";
import { Spin } from "antd";

export default function Router() {
  // Redux
  const customise = useSelector((state) => state.customise);
  const dispatch = useDispatch();

  const auth = localStorage.getItem("token");
  const { permission, type, permissionLoading } = usePermissionContext();
  const location = useLocation();

  // Dark Mode
  useEffect(() => {
    document.querySelector("body").classList.add(customise.theme);
    dispatch(theme(customise.theme));
  }, []);

  // RTL
  useEffect(() => {
    if (customise.direction == "ltr") {
      document.querySelector("html").setAttribute("dir", "ltr");
    } else if (customise.direction == "rtl") {
      document.querySelector("html").setAttribute("dir", "rtl");
    }
  }, []);

  // Default Layout
  const DefaultLayout = customise.layout; // FullLayout or VerticalLayout

  // All of the available layouts
  const Layouts = { VerticalLayout, HorizontalLayout, FullLayout };

  // Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];
    if (Routes) {
      // global routes like error page and login form
      GlobalRoutes.filter(
        (route) =>
          route.layout === layout &&
          (LayoutRoutes.push(route), LayoutPaths.push(route.path))
      );

      // Checks if Route layout or Default layout matches current layout and type
      if (type === 1) {
        Routes.filter(
          (route) =>
            route.layout === layout &&
            (LayoutRoutes.push(route), LayoutPaths.push(route.path))
        );
      }

      if (type === 3) {
        WoRoutes.filter(
          (route) =>
            route.layout === layout &&
            (LayoutRoutes.push(route), LayoutPaths.push(route.path))
        );
      }
    }
    return { LayoutRoutes, LayoutPaths };
  };

  // Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

      let LayoutTag;
      if (DefaultLayout == "HorizontalLayout") {
        if (layout == "VerticalLayout") {
          LayoutTag = Layouts["HorizontalLayout"];
        } else {
          LayoutTag = Layouts[layout];
        }
      } else {
        LayoutTag = Layouts[layout];
      }

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag>
            <Switch>
              {LayoutRoutes.map((route) => {
                if (route.noNeedAuth) {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact === true}
                      render={(props) => {
                        return (
                          <Suspense fallback={null}>
                            {route.layout === "FullLayout" ? (
                              <route.component {...props} />
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  type: "spring",
                                  duration: 0.5,
                                  delay: 0.5,
                                }}
                              >
                                <route.component {...props} />
                              </motion.div>
                            )}
                          </Suspense>
                        );
                      }}
                    />
                  );
                } else {
                  if (auth) {
                    if (
                      permission.includes(route.path) ||
                      route.path == "/dashboard"
                    ) {
                      if (
                        (type == 1 && route.type == type) ||
                        (type == 3 && route.type == type)
                      ) {
                        return (
                          <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact === true}
                            render={(props) => {
                              return (
                                <Suspense fallback={null}>
                                  {route.layout === "FullLayout" ? (
                                    <route.component {...props} />
                                  ) : (
                                    <motion.div
                                      initial={{ opacity: 0, y: 50 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        type: "spring",
                                        duration: 0.5,
                                        delay: 0.5,
                                      }}
                                    >
                                      <route.component {...props} />
                                    </motion.div>
                                  )}
                                </Suspense>
                              );
                            }}
                          />
                        );
                      }
                    }
                  }
                }
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };

  return permissionLoading ? (
    <LoadingPage />
  ) : (
    <BrowserRouter>
      <Switch>
        {ResolveRoutes()}
        {/* Home Page */}
        {auth ? (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
            }}
          />
        )}
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

import Logo from "../assets/images/logo/BEST_WISHES.png";

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 200,
          height: 125,
          objectFit: "contain",
        }}
      >
        <img src={Logo} alt="logo" />
      </div>
      <Spin size="large" />
    </div>
  );
}
