"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data - replace with API call
const products = [
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
  // Add more products...
]

const categories = ["All", "Running", "Football", "Basketball", "Tennis", "Swimming", "Cycling"]
const brands = ["Nike", "Adidas", "Under Armour", "Wilson", "Puma", "New Balance"]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.some((brand) => product.name.includes(brand))
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedBrands([])
    setPriceRange([0, 500])
    setSearchQuery("")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Search Products</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brands */}
      <div>
        <label className="text-sm font-medium mb-2 block">Brands</label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={brand} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="mt-2" />
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterContent />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
