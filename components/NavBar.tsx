'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { setSearchQuery } from '@/redux/productSlice';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector((state) => state.cart);
    const productData = useAppSelector((state) => state.product);
    const searchQueryVal = productData?.searchQuery || '';

    const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

    const handleClear = () => {
        dispatch(setSearchQuery(''));
    }

    return (
        <header>
            <nav>
                <Link href="/" className='logo'>
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <p>CartiFy</p>
                </Link>
                <div className='search' style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder='Search'
                        value={searchQueryVal}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        id="search-input"
                    />
                    {searchQueryVal && (
                        <img
                            src="/cross.svg"
                            alt="Clear"
                            onClick={handleClear}
                            style={{
                                position: 'absolute',
                                right: '110px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                opacity: 0.5
                            }}
                        />
                    )}
                    <button>Search</button>
                </div>
                <ul>
                    <li className="cart-container">
                        <Link href="/cart">
                            <Image src="/cart-icon.svg" alt="Cart" width={24} height={24} />
                        </Link>
                        <p className='cart-count'>{totalQty}</p>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar