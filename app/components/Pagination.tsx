
// import { useEffect, useState, useCallback, useMemo } from "react";

// const PAGE_SIZE = 10;

// type Product = {
//   thumbnail?: string;
//   title: string;
//   image?: string;
//   price?: string;
// };

// const ProductCard = ({ image, title, price }: Product) => (
//   <div className="product-card w-[200px] p-4 border rounded shadow-md flex flex-col items-center justify-center text-center m-4 bg-white">
//     <img src={image} alt={title} className="w-[220px] h-[100px] object-cover rounded" />
//     <h3 className="mt-2 font-semibold text-lg">{title}</h3>
//     <span className="text-green-600 font-bold mt-1">${price}</span>
//   </div>
// );

// const Pagination = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   const fetchData = async () => {
//     const data = await fetch("https://dummyjson.com/products?limit=169");
//     const json = await data.json();
//     setProducts(json?.products || []);
//   };

//   const handleclick = useCallback((p: number) => {
//     setCurrentPage(p);
//   }, []);

//   const total_no_pages = useMemo(() => Math.ceil(products.length / PAGE_SIZE), [products]);

//   const paginatedProducts = useMemo(() => {
//     const start = currentPage * PAGE_SIZE;
//     const end = start + PAGE_SIZE;
//     return products.slice(start, end);
//   }, [products, currentPage]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (!products.length) return <h2>Products Not found</h2>;

//   return (
//     <>
//       <h4 className="flex justify-center font-semibold m-3"> Products List</h4>
//       <div className="flex justify-center">
//         {[...Array(total_no_pages).keys()].map((p) => (
//           <span
//             key={p}
//             className={`flex justify-center p-3 w-8 mx-1 text-red-300 underline cursor-pointer hover:text-black transition 
//               ${currentPage === p ? "text-green-600 font-bold ring-2 ring-green-500 rounded" : ""}`}
//             onClick={() => handleclick(p)}
//           >
//             {p + 1}
//           </span>
//         ))}
//       </div>
//       <div className="flex flex-wrap">
//         {paginatedProducts.map((product, index) => (
//           <ProductCard key={index} title={product.title} image={product.thumbnail} price={product.price} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Pagination;


import { useEffect, useState } from "react"
import { Link } from "react-router"

const PAGE_SIZE = 10

type Product = {
  thumbnail?: string,
  title: string,
  image?: string,
  price?: string,
  id?: number
}

const ProductCard = ({ image, title, price, id }: Product & { id: number }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="product-card w-[200px] p-4 border rounded shadow-md flex flex-col items-center justify-center text-center m-4 bg-white">
        <img src={image} alt={title} className="w-[220px] h-[100px] object-cover rounded" />
        <h3 className="mt-2 font-semibold text-lg">{title}</h3>
        <span className="text-green-600 font-bold mt-1">${price}</span>
      </div>
    </Link>
  );
}

const Pagination = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const totalProducts = products?.length
  const total_no_pages: any = Math.ceil(totalProducts / PAGE_SIZE)
  const start = currentPage * PAGE_SIZE
  const end = start + PAGE_SIZE

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500")
    const json = await data.json()
    setProducts(json?.products || [])
    console.log(json)
  }
  const handleclick = (p: number) => setCurrentPage(p)

  useEffect(() => {
    fetchData()
  }, [])

  return !products.length ? (<h2> Products Not found</h2>) :
    <>
      <h4 className="text-center font-semibold my-4 text-lg sm:text-xl">
        Products List
      </h4>

      <div className="flex justify-center flex-wrap gap-2 px-2">
        {
          [...Array(total_no_pages).keys()].map((p) => (
            <span
              key={p}
              className={`flex items-center justify-center px-3 py-2 w-8 sm:w-10 text-sm sm:text-base text-red-300 underline cursor-pointer hover:text-black transition 
        ${currentPage === p && "text-green-600 font-bold ring-2 ring-green-200 rounded"}`}
              onClick={() => handleclick(p)}
            >
              {p + 1}
            </span>
          ))
        }
      </div>

      <div className="flex flex-wrap">
        {
          products.slice(start, end).map((product, index) => (
            <ProductCard key={index} title={product.title} image={product.thumbnail} price={product.price} id={product.id!} />
          ))
        }
      </div>
    </>
}

export default Pagination