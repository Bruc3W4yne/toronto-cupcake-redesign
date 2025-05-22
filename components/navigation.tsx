"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Home, Cake, Info, Phone, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Check if we're on the order page
  const isOrderPage = pathname === "/order"

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5 mr-3" /> },
    { name: "Flavors", href: "/#flavors", icon: <Cake className="h-5 w-5 mr-3" /> },
    { name: "About", href: "/#about", icon: <Info className="h-5 w-5 mr-3" /> },
    { name: "Contact", href: "/#contact", icon: <Phone className="h-5 w-5 mr-3" /> },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Navigation Bar */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          scrolled || isOrderPage ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/toronto-cupcake-logo.png"
                alt="Toronto Cupcake Logo"
                width={50}
                height={50}
                className="mr-2"
              />
              <span
                className={cn(
                  "font-playfair text-xl font-bold transition-colors duration-300 md:hidden",
                  scrolled || isOrderPage
                    ? "text-brand-pink dark:text-accent-gold"
                    : "text-white drop-shadow-md dark:text-accent-gold",
                )}
              >
                Toronto Cupcake
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors duration-200 hover:text-brand-pink dark:hover:text-accent-gold",
                    scrolled || isOrderPage
                      ? "text-gray-700 dark:text-gray-200"
                      : "text-white drop-shadow-md dark:text-gray-200",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/order"
                className={cn(
                  "font-medium transition-colors duration-200 hover:text-brand-pink dark:hover:text-accent-gold flex items-center",
                  scrolled || isOrderPage
                    ? "text-gray-700 dark:text-gray-200"
                    : "text-white drop-shadow-md dark:text-gray-200",
                )}
              >
                <ShoppingBag className="h-5 w-5 mr-1" />
                Order Now
              </Link>
            </nav>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center md:hidden">
              <Link
                href="/order"
                className={cn(
                  "mr-4 transition-colors duration-200",
                  scrolled || isOrderPage
                    ? "text-gray-700 dark:text-gray-200"
                    : "text-white drop-shadow-md dark:text-gray-200",
                )}
                aria-label="Order Now"
              >
                <ShoppingBag className="h-6 w-6" />
              </Link>
              <button
                onClick={toggleMenu}
                className={cn(
                  "menu-button p-1 focus:outline-none transition-colors duration-200",
                  scrolled || isOrderPage
                    ? "text-gray-700 dark:text-gray-200"
                    : "text-white drop-shadow-md dark:text-gray-200",
                )}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Height Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/30 z-40 transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
        onClick={closeMenu}
      ></div>

      {/* Mobile Side Menu with Enhanced Rose-Pink Hue */}
      <div
        className={cn(
          "mobile-menu fixed top-0 right-0 bottom-0 w-[60%] bg-rose-50/50 backdrop-blur-xl z-50 shadow-xl md:hidden transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Consolidated Navigation Container */}
        <nav className="flex flex-col h-full p-4">
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1"></div>
            <span className="font-playfair text-xl font-bold text-brand-pink dark:text-accent-gold drop-shadow-sm text-center flex-1">
              Menu
            </span>
            <div className="flex-1 flex justify-end">
              <button
                onClick={closeMenu}
                className="p-2 bg-black/70 text-white hover:bg-black dark:bg-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-pink dark:focus:ring-accent-gold rounded-full shadow-md backdrop-blur-sm transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 stroke-[2.5px]" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-2 flex-1 overflow-y-auto py-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center px-4 py-3 text-brand-pink dark:text-brand-pink hover:bg-white/40 dark:hover:bg-white/40 rounded-lg transition-colors duration-200 font-bold"
                  onClick={closeMenu}
                >
                  <span className="text-brand-pink mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/order"
                className="flex items-center px-4 py-3 text-brand-pink dark:text-brand-pink hover:bg-white/40 dark:hover:bg-white/40 rounded-lg transition-colors duration-200 font-bold"
                onClick={closeMenu}
              >
                <span className="text-brand-pink mr-3">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                Order Now
              </Link>
            </li>
          </ul>

          {/* Order Now Button */}
          <div className="mt-auto pt-6">
            <Link
              href="/order"
              className="block w-full bg-brand-pink hover:bg-brand-pink/90 text-white dark:text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md text-center"
              onClick={closeMenu}
            >
              Order Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
