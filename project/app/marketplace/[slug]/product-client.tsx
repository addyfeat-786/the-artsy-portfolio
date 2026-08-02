'use client';

import { useState } from 'react';
import { Check, Heart, Star, ShoppingCart } from 'lucide-react';

interface ProductClientProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    fileType: string;
    fileSize: string;
    software: string;
    includes: string[];
  };
}

export default function ProductClient({ product }: ProductClientProps) {
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
          {product.rating.toFixed(1)}
        </span>
        <span>·</span>
        <span>{product.reviews} reviews</span>
      </div>

      <p className="mt-6 max-w-md text-pretty text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-8 space-y-3 border-y border-hairline py-6 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">File type</span>
          <span>{product.fileType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">File size</span>
          <span>{product.fileSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Software</span>
          <span>{product.software}</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Includes
        </p>
        <ul className="space-y-2">
          {product.includes.map((inc) => (
            <li key={inc} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 text-muted-foreground" />
              {inc}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <span className="font-display text-3xl">${product.price}</span>
        <button
          onClick={() => setAdded(true)}
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-[0.2em] text-background transition-all hover:opacity-90"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added to cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </>
          )}
        </button>
        <button
          onClick={() => setWished((w) => !w)}
          aria-label="Wishlist"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:bg-secondary"
        >
          <Heart
            className={`h-4 w-4 ${wished ? 'fill-foreground text-foreground' : ''}`}
          />
        </button>
      </div>
    </div>
  );
}
