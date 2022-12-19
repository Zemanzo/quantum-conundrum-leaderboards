import React from "react";
import ReactDOM from "react-dom/client";
import { RouteObject, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import FullGame from "./full-game/FullGame";
import "./index.css";
import IndividualLevels from "./individual-levels/IndividualLevels";
import NoMatch from "./no-match/NoMatch";
import PageWrapper from "./page-wrapper/PageWrapper";

const routes = [
  {
    path: "/",
    element: <FullGame />,
  },
  {
    path: "/individual-levels",
    element: <IndividualLevels />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
].map(wrapRoutes);

function wrapRoutes(route: RouteObject): RouteObject {
  return { ...route, element: <PageWrapper>{route.element}</PageWrapper> };
}

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
