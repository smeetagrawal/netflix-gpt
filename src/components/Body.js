import React from "react";
import { RouterProvider } from "react-router-dom";
import appRouter from "../router";

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
