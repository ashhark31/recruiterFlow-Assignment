import { StarIcon } from "@heroicons/react/16/solid"
import type { ProductCardProps, ProductMainProps } from "../type/type"
import DeleteIcon from '@mui/icons-material/Delete';

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

// main-section of the card which contains card info like title, price etc.
const CardMain:React.FC<ProductMainProps> = ({product}) => {
    return (
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-900">
                    <span aria-hidden="true" className="absolute" />
                    {product.title.split(' ',2).join(' ')}
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                    Brand: <span className="text-gray-700">{product.brand}</span>
                </p>
                <p className="mt-1 text-sm text-gray-900">
                    Category: <span className="text-gray-700">{product.category}</span>
                </p>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
                <p className="text-sm font-medium text-gray-500">{Math.floor(product.discountPercentage)}% off</p>
            </div>
        </div>
    )
}

// footer-section of the card which contains rating, reviews and delete event.
const CardFooter:React.FC<ProductCardProps> = ({product,deleteCard}) => {
    return (
        <div className="grid grid-cols-2 mt-3 items-center">
            <div className="grid grid-cols-1">
                <div className="flex">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                                product.rating > rating ? 'text-yellow-500' : 'text-gray-200',
                                'size-5 shrink-0',
                            )}
                        />
                    ))}
                </div>
                <div>
                    <span className="text-sm text-gray-500">&nbsp;{product.reviews} reviews</span>
                </div>
            </div>
            <div className="flex justify-end">
                <button 
                    onClick={()=>deleteCard(product.id)}
                    className="cursor-pointer rounded-[50%] p-[5px] hover:bg-pink-100"
                >
                    <DeleteIcon style={{color:'red'}} />
                </button>
            </div>
        </div>
    )
}

export const Card:React.FC<ProductCardProps> = ({product,deleteCard}) => {
    return (
        <div key={product.id} className="group relative shadow-lg">

            {/* Top section of the card which contains product image */}
            <img
                alt={product.thumbnail}
                src={product.thumbnail}
                className="aspect-square w-full cursor-pointer rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-50"
            />

            <div className="px-5 py-5">
                <CardMain product={product} />
                <CardFooter product={product} deleteCard={deleteCard} />
            </div>

        </div>
    )
}