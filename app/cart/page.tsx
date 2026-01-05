'use client'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { removeFromCart, incrementQty, decrementQty, clearCart } from '@/redux/cartSlice'
import NavBar from '@/components/NavBar'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const CartPage = () => {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector((state) => state.cart);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const router = useRouter();
    return (
        <div>

            <div className='cart-page-container'>
                <h1 className='page-title'>Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className='empty-cart'>
                        <p>Your cart is empty</p>
                        <Link href='/' className='continue-shopping'>Continue Shopping</Link>
                    </div>
                ) : (
                    <div className='cart-layout'>
                        <div className='cart-items-list'>
                            {cartItems.map((item) => (
                                <div className='cart-item-card' key={item.product.id}>
                                    <div className="item-image">
                                        <img src={item.product.image} alt={item.product.name} />
                                    </div>

                                    <div className="item-info">
                                        <Link href={`/product/${item.product.id}`}>
                                            <h3>{item.product.name}</h3>
                                        </Link>
                                        <p className="item-price">${item.product.price}</p>
                                        <div className="qty-controls">
                                            <button
                                                onClick={() => dispatch(decrementQty(item.product.id))}
                                                className="qty-btn"
                                            >
                                                -
                                            </button>
                                            <span className="qty-value">{item.qty}</span>
                                            <button
                                                onClick={() => dispatch(incrementQty(item.product.id))}
                                                className="qty-btn"
                                            >
                                                +
                                            </button>
                                        </div>

                                    </div>

                                    <div className="item-actions">
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.product.id))}
                                            className="remove-btn"
                                            style={{
                                                backgroundColor: '#dc2626',
                                                color: 'white',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.375rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Image
                                                src="/remove-cart.svg"
                                                alt="Remove"
                                                width={16}
                                                height={16}
                                                style={{ filter: 'brightness(0) invert(1)' }}
                                            />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='cart-summary'>
                            <h2>Order Summary</h2>
                            <div className='summary-row'>
                                <span>Total Items</span>
                                <span>{totalItems}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="checkout-btn" onClick={() => {
                                router.push('/success');
                            }}>Proceed to Checkout</button>


                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage