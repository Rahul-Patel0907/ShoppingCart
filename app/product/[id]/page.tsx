'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { Product } from "@/interfaces";
import { useDispatch } from "react-redux";
import NavBar from '@/components/NavBar';

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
                        image: data.image
                    })

                })
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>
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
                    <p className="price">${product.price}</p>
                    <button
                        onClick={() => isInCart ? dispatch(removeFromCart(product.id)) : dispatch(addToCart(product))}
                        style={{ backgroundColor: isInCart ? '#dc2626' : 'black' }}
                    >
                        {isInCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
