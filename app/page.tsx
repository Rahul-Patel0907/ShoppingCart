"use client";
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchProducts } from '@/redux/productSlice'
import { addToCart, removeFromCart } from '@/redux/cartSlice'
import Link from 'next/link';
import Loader from '@/components/Loader';

const Page = () => {

  const dispatch = useAppDispatch()
  const { products, isLoading, error, searchQuery } = useAppSelector((state) => state.product)
  const { cartItems } = useAppSelector((state) => state.cart);

  const isInCart = (id: number) => { return cartItems.some((item) => item.product.id === id); };

  const handleAddToCart = (product: any) => { dispatch(addToCart(product)); }
  const handleRemoveFromCart = (id: number) => { dispatch(removeFromCart(id)); }

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => { dispatch(fetchProducts()) }, [dispatch])

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <NavBar />
      <div className="Product-Container">
        {filteredProducts.map((product) => {
          const added = isInCart(product.id);
          return (
            <div className="Product-Card" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </Link>
              <div className="product-footer">
                <p>${product.price}</p>
                <button
                  onClick={() => added ? handleRemoveFromCart(product.id) : handleAddToCart(product)}
                  style={{ backgroundColor: added ? '#dc2626' : '' }}
                >
                  {added ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Page
