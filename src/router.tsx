import { EditArticle } from "./view/editArticle";
import { Home } from "./view/home";
import { Layout } from "./view/layouts";
import { NewArticle } from "./view/newArticle";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "new-article",
        element: <NewArticle />,
      },
      {
        path: "edit-article/:id",
        element: <EditArticle />,
      },
    ],
  },
]);
