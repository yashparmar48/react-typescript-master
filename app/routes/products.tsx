import Pagination from "~/components/Pagination";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product List" },
    { name: "description", content: "Browse all products." },
  ];
}

export default function Products() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {/* List your products here with links */}
         <Pagination/>
    </main>
  );
}
