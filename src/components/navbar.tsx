"use client";
import Link from "next/link";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { items } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white shadow">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <Link href="/" className="hover:text-blue-600">
                        My E-commerce
                    </Link>
                    <div className="hidden gap-x-6 md:flex">
                        <Link href="/">Home</Link>
                        <Link href="/products" className="hover:text-blue-600">
                            Products
                        </Link>
                        <Link href="/checkout" className="hover:text-blue-600">
                            Checkout
                        </Link>
                    </div>
                    <div className="relative flex items-center gap-x-4">
                        <Link href="/checkout" className="relative">
                            <ShoppingCartIcon className="h-6 w-6" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-center text-xs leading-4 text-white">{cartCount}</span>}
                        </Link>
                        <Button variant="ghost" className="md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
                            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
                        </Button>
                    </div>
                </div>
                {mobileOpen && (
                    <nav>
                        <ul className="flex flex-col p-4">
                            <li>
                                <Link href="/" className="hover:text-blue-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-blue-600">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/checkout" className="hover:text-blue-600">
                                    Checkout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </nav>
        </>
    );
}
