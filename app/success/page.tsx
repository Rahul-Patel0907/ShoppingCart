"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/store';
import { clearCart } from '@/redux/cartSlice';

const SuccessPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">

            <div className="max-w-md w-full mx-auto px-4 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                        Order Placed!
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    <Link
                        href="/"
                        className="block w-full bg-black text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
                    >
                        Continue Shopping
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
