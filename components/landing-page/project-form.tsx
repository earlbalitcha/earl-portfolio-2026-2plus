"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log("Form submitted:", formData)
  }

  const inputClassName =
    "w-full px-4 py-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"

  return (
    <div className="container mx-auto py-12 px-6 md:px-10">
      <div className="max-w-xl mx-auto w-full">
        <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 md:p-8 shadow-lg">
          <div className="mb-8">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Share a few details about your project or role. I&apos;ll follow up by email to align on scope and next steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-foreground text-sm font-medium mb-3">
                What is your first name? <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={inputClassName}
                  placeholder=""
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 bg-primary/15 rounded flex items-center justify-center border border-primary/30">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <div className="w-1 h-1 bg-primary/70 rounded-full ml-0.5" />
                    <div className="w-1 h-1 bg-primary/70 rounded-full ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-foreground text-sm font-medium mb-3">
                Last name? <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={inputClassName}
                placeholder=""
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-foreground text-sm font-medium mb-3">
                What is your email? <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={inputClassName}
                placeholder=""
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-foreground text-sm font-medium mb-3">
                Your phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClassName}
                placeholder=""
              />
            </div>

            <div className="pt-6">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium opacity-50 cursor-not-allowed transition-all"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
