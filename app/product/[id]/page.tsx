'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { Product } from "@/interfaces";
import { useDispatch } from "react-redux";
import NavBar from '@/components/NavBar';
import Loader from '@/components/Loader';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const dispatch = useDispatch();

    const { cartItems } = useAppSelector((state) => state.cart);

    useEffect(() => {

        if (id) {

            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .then((data) => {

                    setProduct({
                        id: data.id,
                        name: data.title,
                        price: data.price,
                        description: data.description,
                        rating: data.rating.rate,
                        category: data.category,
                        image: data.image
                    })

                })
        }
    }, [id]);

    if (!product) {
        return <Loader />
    }

    const isInCart = cartItems.some((item) => item.product.id === product.id);

    return (
        <div>
            <NavBar />
            <div className="product-detail-container">
                <div className="detail-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="detail-content">
                    <h1>{product.name}</h1>
                    <p className="desc">{product.description}</p>
                    <div className="detail-actions">
                        <p className="price">${product.price}</p>
                        <button
                            onClick={() => isInCart ? dispatch(removeFromCart(product.id)) : dispatch(addToCart(product))}
                            style={{ backgroundColor: isInCart ? '#dc2626' : 'black' }}
                        >
                            {isInCart ? "Remove" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
