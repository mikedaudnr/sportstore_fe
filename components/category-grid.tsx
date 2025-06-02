import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Football",
    image: "/placeholder.svg?height=200&width=200",
    productCount: 156,
    href: "/products?category=football",
  },
  {
    name: "Basketball",
    image: "/placeholder.svg?height=200&width=200",
    productCount: 89,
    href: "/products?category=basketball",
  },
  {
    name: "Tennis",
    image: "/placeholder.svg?height=200&width=200",
    productCount: 67,
    href: "/products?category=tennis",
  },
  {
    name: "Running",
    image: "/placeholder.svg?height=200&width=200",
    productCount: 234,
    href: "/products?category=running",
  },
  {
    name: "Swimming",
    image: "/placeholder.svg?height=200&width=200",
    productCount: 45,
    href: "/products?category=swimming",
  },
  {
    name: "Cycling",
    image: "/placeholder.svg?height=200&width=200",
    productCount: 78,
    href: "/products?category=cycling",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need for your favorite sport
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
