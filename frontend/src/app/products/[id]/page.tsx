import { notFound } from 'next/navigation';
import Image from 'next/image'

type RetailerPrice = {
    retailer_name: string;
    price: number;
    retailer_url: string
};

type ProductDetail = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: 'no-store', // Ensures fresh data for each request
  });

  if (!res.ok) {
    notFound(); // Redirects to 404 if product not found
  }

  const data = await res.json();
  const { product, prices } = data;

  return (
    <div className="mx-auto p-4 bg-gray-100 justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">{product.name}</h1>
      <Image
        src={product.image_url}
        alt={product.name}
        width={400}
        height={400}
      />
      <p className="text-gray-700">{product.description}</p>
      <h4 className="text-gray-700">Available at:</h4>
      <ul>
          {prices.map(
            (price: RetailerPrice, index: number) => (
              <li key={index}>
                <a 
                  href={price.retailer_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline"
                >
                  {price.retailer_name}
                </a>
                <a className="text-gray-700"> ${price.price} </a>
              </li>
            )
          )}
        </ul>
      
    </div>
  );
};

export default ProductPage;
