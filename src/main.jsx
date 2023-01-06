import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import NuevoCliente, {
  action as actionNuevoCliente,
} from "./pages/NuevoCliente";
import Inicio from "./pages/Inicio";
import { loader as loaderCliente } from "./pages/Inicio";
import ErrorPage from "./components/ErrorPage";
import EditarCliente, {
  loader as loaderEditarCliente,
  action as actionEditarCliente,
} from "./pages/EditarCliente";
import { action as actionEliminarCliente } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
        loader: loaderCliente,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: actionNuevoCliente,
      },
      {
        path: "/clientes/:id/editar",
        element: <EditarCliente />,
        loader: loaderEditarCliente,
        action: actionEditarCliente,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:id/eliminar",
        action: actionEliminarCliente,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
