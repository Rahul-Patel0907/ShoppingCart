import React, { useState } from 'react';
import Image from 'next/image';

interface FilterBarProps {
    onFilterChange: (category: string) => void;
    onSortChange: (option: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Default");

    const categories = [
        "All",
        "men's clothing",
        "women's clothing",
        "electronics",
        "jewelery"
    ];

    const sortOptions = [
        { label: "Default", value: "default" },
        { label: "Top Rated", value: "rating_desc" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
    ];

    const handleCategoryClick = (cat: string) => {
        setActiveCategory(cat);
        onFilterChange(cat);
    };

    const handleSortSelect = (option: { label: string, value: string }) => {
        setSelectedSort(option.label);
        onSortChange(option.value);
        setIsSortOpen(false);
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-[72px] z-40">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-row items-center justify-between gap-4">


                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 pb-1 sm:pb-0">

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >

                        <div className="hidden sm:flex items-center gap-1">
                            <span className="text-gray-500">Sort by:</span>
                            <span>{selectedSort}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>


                        <div className="sm:hidden p-2 rounded-full hover:bg-gray-100">
                            <Image src="/sort-icon.svg" alt="Sort" width={24} height={24} />
                        </div>
                    </button>

                    {isSortOpen && (
                        <>

                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsSortOpen(false)}
                            ></div>

                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-20 overflow-hidden">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortSelect(option)}
                                            className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedSort === option.label ? 'font-semibold text-black bg-gray-50' : 'text-gray-600'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FilterBar;
