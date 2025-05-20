import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product ID: {id}</h1>
      {/* Fetch and display more product details based on the ID */}
    </main>
  );
}
