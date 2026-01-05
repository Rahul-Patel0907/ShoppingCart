"use client";
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchProducts } from '@/redux/productSlice'
import { addToCart, removeFromCart } from '@/redux/cartSlice'
import Link from 'next/link';
import Loader from '@/components/Loader';
import FilterBar from '@/components/FilterBar';

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
      <NavBar />
      <FilterBar onFilterChange={setSelectedCategory} onSortChange={setSortOption} />
      <div className="Product-Container">
        {filteredProducts.map((product) => {
          const added = isInCart(product.id);
          return (
            <div className="Product-Card" key={product.id}>
              <Link href={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3 style={{ textAlign: 'left', margin: 0 }}>{product.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>
                  <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>{product.rating}</span>
                </div>
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
