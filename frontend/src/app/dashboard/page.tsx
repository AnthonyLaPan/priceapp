'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  image_url: string;
  price: number;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-gray-100 justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">PriceComp</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-contain"
              priority
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{product.name}</h3>
              <button
                onClick={() => {
                  // Navigate to product detail page
                  window.location.href = `/products/${product.id}`;
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;