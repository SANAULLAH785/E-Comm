import { ROUTES } from "../utils/routes";
import { ROLES } from "../utils/constants";
import { Route } from "react-router-dom";
import Dashboard from "../Components/HomePage/HomePage";
import AddProduct from "../Components/Seller/addproduct";
import Login from '../Components/Login/login';

export const PROTECTED_ROUTES = [
  // {
  //   id: 1,
  //   path: ROUTES.PROTECTED_ROUTES_NAMES.root,
  //   element:<Dashboard/>,
  //   role: [  ROLES.Purchaser],
  // },
  {
    id: 2,
    path: ROUTES.PROTECTED_ROUTES_NAMES.blogs,
    // element: <h1>Blog</h1>,
    role: [ROLES.USER],
    children: [
      {
        index: true,
        id: 5,
        path: `${ROUTES.PROTECTED_ROUTES_NAMES.blogs}/:blogId`,
        element: <h1>Single Blog</h1>,
      },
      {
        id: 6,
        path: `${ROUTES.PROTECTED_ROUTES_NAMES.blogs}/create`,
        element: <h1>Create Blog</h1>,
      },
    ],
  },
  {
    id: 3,
    path: ROUTES.PROTECTED_ROUTES_NAMES.departments,
    element: <h1>Departments</h1>,
    role: [ROLES.USER],
  },
  {
    id: 4,
    path: ROUTES.PROTECTED_ROUTES_NAMES.projects,
    element: <h1>projects</h1>,
  },
  {
    id: 7,
    path: `${ROUTES.PROTECTED_ROUTES_NAMES.blogs}/:blogId`,
    element: <h1>Single Blog</h1>,
  },

  /* For nested Routes */
  {
    id: 8,
    path: `post`,
    // element: <h1>Blog test</h1>,
  },
  {
    id:9,
    path:'/login',
    element: <Login/>,
    roles:[ ROLES.SELLER]
  }

  

];

