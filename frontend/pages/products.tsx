import { useEffect, useState } from 'react';

type Product = {
    id: number;
    name: string;
    retailer: string;
    price: number;
    url: string;
    last_updated: string;
    };

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>Retailer: {product.retailer}</p>
                            <p>Price: {product.price}</p>
                            <a href={product.url} target="_blank" rel="noopener noreferrer">
                                View product
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Products;