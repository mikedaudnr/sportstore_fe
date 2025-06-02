"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: number
  salePrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // Add to cart logic here
    console.log("Added to cart:", product.id)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
          )}

          {/* Wishlist button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>

          {/* Quick add to cart */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="w-full" size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{product.category}</div>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">${product.salePrice || product.price}</span>
              {product.salePrice && (
                <span className="text-sm text-muted-foreground line-through">${product.price}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
