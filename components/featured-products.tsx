import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

// Mock data - replace with API call
const featuredProducts = [
  {
    id: 1,
    name: "Nike Air Max Running Shoes",
    price: 129.99,
    salePrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviewCount: 128,
    category: "Running",
  },
  {
    id: 2,
    name: "Adidas Football Jersey",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 89,
    category: "Football",
  },
  {
    id: 3,
    name: "Wilson Tennis Racket Pro",
    price: 199.99,
    salePrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 56,
    category: "Tennis",
  },
  {
    id: 4,
    name: "Under Armour Basketball Shorts",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviewCount: 94,
    category: "Basketball",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium sports equipment and apparel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
