"use client";
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchProducts } from '@/redux/productSlice'
import { addToCart, removeFromCart } from '@/redux/cartSlice'
import Link from 'next/link';
import Image from 'next/image';
import Loader from '@/components/Loader';
import FilterBar from '@/components/FilterBar';
import StarRating from '@/components/StarRating';

const Page = () => {

  const dispatch = useAppDispatch()
  const { products, isLoading, error, searchQuery } = useAppSelector((state) => state.product)
  const { cartItems } = useAppSelector((state) => state.cart);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const isInCart = (id: number) => { return cartItems.some((item) => item.product.id === id); };

  const handleAddToCart = (product: any) => { dispatch(addToCart(product)); }
  const handleRemoveFromCart = (id: number) => { dispatch(removeFromCart(id)); }

  const filteredProducts = products
    .filter((product: any) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => {
      if (sortOption === "price_asc") return a.price - b.price;
      if (sortOption === "price_desc") return b.price - a.price;
      if (sortOption === "rating_desc") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  useEffect(() => { dispatch(fetchProducts()) }, [dispatch])

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <FilterBar onFilterChange={setSelectedCategory} onSortChange={setSortOption} />
      <div className="Product-Container">
        {filteredProducts.map((product) => {
          const added = isInCart(product.id);
          return (
            <div className="Product-Card" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-img" />
                <h3 style={{ textAlign: 'left', margin: 0 }}>{product.name}</h3>
                <div style={{ marginTop: '0.25rem' }}>
                  <StarRating rating={product.rating} count={product.ratingCount} />
                </div>
              </Link>
              <div className="product-footer">
                <p>${product.price}</p>
                <button
                  onClick={() => added ? handleRemoveFromCart(product.id) : handleAddToCart(product)}
                  style={{
                    backgroundColor: added ? '#dc2626' : '',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.8rem'
                  }}
                >
                  <Image
                    src={added ? "/remove-cart.svg" : "/add-cart.svg"}
                    alt={added ? "Remove" : "Add"}
                    width={16}
                    height={16}
                    style={{ filter: added ? 'brightness(0) invert(1)' : 'none' }}
                  />
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
