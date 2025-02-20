'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function UnsplashImageHolder() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://api.unsplash.com/photos/random?orientation=landscape', {
                    headers: {
                        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
                        'Accept-Version': 'v1'
                    }
                });
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setImage(data);
            } catch (error) {
                console.error('Error fetching image:', error);
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, []);

    if (loading) {
        return <div>Loading image...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="image-container">
            {image && (
                <Image
                    src={image.urls.regular}
                    alt={image.alt_description || 'Unsplash image'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            )}
        </div>
    );
} 