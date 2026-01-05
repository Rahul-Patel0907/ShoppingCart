'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { usePathname } from 'next/navigation';
import { setSearchQuery } from '@/redux/productSlice';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
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
                    <p className="logo-text">CartiFy</p>
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
                                right: '50px', /* Adjusted for icon-only button */
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                opacity: 0.5,
                                zIndex: 10
                            }}
                        />
                    )}
                    <button className="search-btn">
                        <Image src="/search-icon.svg" alt="Search" width={20} height={20} />
                    </button>
                </div>
                <ul>
                    <li
                        className="cart-container"
                        style={{
                            backgroundColor: pathname === '/cart' ? '#e5e7eb' : 'transparent',
                            borderBottom: pathname === '/cart' ? '3px solid black' : '3px solid transparent',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Link href="/cart">
                            <span className="cart-text" style={{ marginRight: '0.5rem' }}>Cart</span>
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