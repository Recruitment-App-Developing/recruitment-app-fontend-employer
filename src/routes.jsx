import { createBrowserRouter } from "react-router-dom";
import Test from "./test";

export const route = createBrowserRouter([
  {
    id: "root",
    path: "/",
  },
  {
    id: "test",
    path: "/testUI",
    element: <Test />,
  },
]);
