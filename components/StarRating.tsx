import React from 'react';

interface StarRatingProps {
    rating: number;
    count?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="relative inline-block text-lg leading-none" style={{ fontFamily: 'system-ui' }}>

                <div className="text-gray-300">★★★★★</div>


                <div
                    className="absolute top-0 left-0 overflow-hidden text-yellow-500"
                    style={{ width: `${(rating / 5) * 100}%` }}
                >
                    ★★★★★
                </div>
            </div>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            {count !== undefined && (
                <span className="text-sm text-gray-500 font-medium">({count})</span>
            )}
        </div>
    );
};

export default StarRating;
