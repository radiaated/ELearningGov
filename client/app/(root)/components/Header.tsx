"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import type { CurrentUser } from "@/types/user";
import { useCartStore } from "@/store/cartStore";
import getUser from "@/app/lib/getUser";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Online Courses" },
  { href: "/about", label: "About" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const pathname = usePathname();

  const cartItems = useCartStore((state) => state.items);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-screen ${pathname !== "/" ? "shadow" : ""}`}
    >
      {/* Top Bar */}
      <div className="header-topbar">
        <div className="hidden md:block">01-4444444, 01-4444442</div>

        <div className="flex w-full items-center justify-between gap-2 md:w-fit md:justify-normal">
          <Link href="/cart" className="flex items-center gap-1">
            Cart
            <i className="fa-solid fa-cart-shopping" />
            <span>({cartItems.length})</span>
          </Link>

          <div className="flex gap-2">
            {user ? (
              <>
                {user.is_admin && (
                  <Link
                    href="/admin/dashboard"
                    className="header-action header-action--filled"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/classroom/courses"
                  className="header-action header-action--plain"
                >
                  Your Courses
                </Link>

                <Link
                  href="/profile"
                  className="header-action header-action--filled"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  className="header-action header-action--filled"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="header-action header-action--filled"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="header-action header-action--filled"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="header-container">
          <Link href="/">
            <Image
              src={
                isScrolled || pathname !== "/"
                  ? "/logo-black.png"
                  : "/logo-white.png"
              }
              alt="Logo"
              width={140}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-20 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`header-nav-link ${isScrolled || pathname !== "/" ? "header-nav-link-dark" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="ml-2 rounded-md border border-primary-light bg-primary-dark px-2 py-1 text-lg text-white md:hidden"
            onClick={toggleMobileMenu}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`fixed top-0 right-0 h-screen w-full bg-primary-dark pt-4 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="mb-4 ml-2 rounded-md border border-primary-main px-2 py-1 text-xl text-white"
          onClick={toggleMobileMenu}
        >
          <i className="fa-solid fa-arrow-left" />
        </button>

        <ul className="flex flex-col divide-y divide-zinc-100 text-2xl font-medium text-white">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="header-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
