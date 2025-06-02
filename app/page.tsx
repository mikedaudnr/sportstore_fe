import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <TestimonialsSection />
      <NewsletterSignup />
    </div>
  )
}
