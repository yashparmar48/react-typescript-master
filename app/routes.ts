import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx", {}, [
    route(":id", "routes/products.$id.tsx") // ✅ match `id` with `$id`
  ])
] satisfies RouteConfig;