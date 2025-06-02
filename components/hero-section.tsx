import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Gear Up for
                <span className="text-primary"> Victory</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-lg">
                Discover premium sports equipment and apparel from top brands. Elevate your performance with our curated
                collection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/sale">View Sale Items</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-slate-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-slate-400">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-slate-400">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Sports Equipment"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Free Shipping</div>
              <div className="text-xs opacity-90">On orders over $100</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
