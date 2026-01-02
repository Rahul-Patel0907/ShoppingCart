'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { setSearchQuery } from '@/redux/productSlice';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector((state) => state.cart);
    const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);
    return (
        <header>
            <nav>
                <Link href="/" className='logo'>
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <p>Shopping Cart</p>
                </Link>
                <div className='search'>
                    <input type="text" placeholder='Search' onChange={(e) => dispatch(setSearchQuery(e.target.value))} />
                    <button>Search</button>
                </div>
                <ul>
                    <Link href="/cart">My Cart</Link>
                    <p className='cart-count'>{totalQty}</p>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar