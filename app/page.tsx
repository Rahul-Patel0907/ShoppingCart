"use client";
import NavBar from '@/components/NavBar'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchProducts } from '@/redux/productSlice'
import { addToCart, removeFromCart } from '@/redux/cartSlice'
import Link from 'next/link';

const Page = () => {

  const dispatch = useAppDispatch()
  const { products, isLoading, error, searchQuery } = useAppSelector((state) => state.product)

  const { cartItems } = useAppSelector((state) => state.cart);

  const isInCart = (id: number) => { return cartItems.some((item) => item.product.id === id); };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  }

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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
                <p>${product.price}</p>
              </Link>
              <button
                onClick={() => added ? handleRemoveFromCart(product.id) : handleAddToCart(product)}
                style={{ backgroundColor: added ? '#dc2626' : '' }}
              >
                {added ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Page
