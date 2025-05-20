import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),    // correct relative path string
  route("products", "routes/products.tsx", {}, [
    route(":id", "routes/products.$id.tsx"),
  ]),
  route("createUser", "routes/CreateUser.tsx"),
  route("users", "routes/UserList.tsx"),
] satisfies RouteConfig;
