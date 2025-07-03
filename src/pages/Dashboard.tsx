import { useEffect, useState } from "react"
import type { Product } from "../type/type";
import { Card } from "../components/Card";
import { Loader } from "../components/Loader";


export const Dashboard = () => {

    // using useState hook for the products details
    const [loading,setLoading] = useState(true);
    const [products,setProducts] = useState<Product[]>([]);
    const [cloneProducts, setcloneProducts] = useState<Product[]>([]);

    // to get all products data (utilizing dummyjson api)
    const getProductsData = async () => {
        try{
            const response = await fetch('https://dummyjson.com/products');
            if(!response.ok){
                throw new Error(`Http error: ${response}`)
            }
            const data = await response.json();
            const filteredData = data.products.map((product:Product)=> {
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    discountPercentage:product.discountPercentage,
                    category: product.category,
                    brand: product.brand,
                    rating: product.rating,
                    reviews: product.reviews.length,
                    thumbnail: product.thumbnail
                }
            })
            setProducts(filteredData);
            setcloneProducts(filteredData);
        } catch(error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // to delete specific card on click event
    const deleteProductCard = async (id:number) => {
        try{
            // const response = await fetch(`https://dummyjson.com/products/${id}`, {method:'DELETE'});
            // if(!response.ok){
            //     throw new Error(`Http error: ${response}`)
            // }

            // Since the 'Delete Mock API' feature isn't working, I'm using the existing records to delete.
            const data = products.filter((product)=>product.id!==id);
            setProducts(data);

        } catch (error) {
            console.error(error);
        }
    }

    // to create product card on click event
    const createProductCard = async () => {
        // Since the 'Create Mock API' feature isn't working, I'm using the existing cards in a random order to proceed.
        const index = Math.floor(Math.random()*cloneProducts.length);
        const data = cloneProducts[index];
        data.id = cloneProducts.length;
        setProducts([data,...products]);
    }

    // utilizing useEffect hook to get products details on render
    useEffect(()=>{
        getProductsData();
    },[]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8">
                
                {/* Header Title */}
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products List</h1>

                {/* Add Card Button */}
                <div>
                    <button
                        onClick={()=>createProductCard()}
                        className="mt-5 flex items-center justify-center cursor-pointer rounded-[50px] border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                    >
                        Add Item
                    </button>
                </div>

                {/* Display List of Cards */}
                {
                    loading ? <Loader/>
                    : 
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Card product={product} deleteCard={deleteProductCard} />
                        ))}
                    </div>
                }

            </div>
        </div>
    )
}