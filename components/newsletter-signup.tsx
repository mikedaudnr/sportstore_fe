"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay in the Game</h2>
          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter for exclusive deals, new product launches, and sports tips from the pros.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Thank you for subscribing!</h3>
              <p className="opacity-90">You'll receive our latest updates and exclusive offers.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-black"
              />
              <Button type="submit" variant="secondary" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </form>
          )}

          <p className="text-sm opacity-75 mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
