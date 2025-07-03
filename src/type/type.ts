
export interface Product {
    id: number,
    title: string,
    price: number,
    discountPercentage:number
    category: string,
    brand: string,
    rating: number,
    reviews: string
    thumbnail: string
}

export interface ProductMainProps {
    product: Product
}

export interface ProductCardProps {
    product: Product,
    deleteCard: (id:number) => void;
}