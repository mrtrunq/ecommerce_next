"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
    const { clearCart } = useCartStore();
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <>
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-bold">Payment successfully</h1>
                <p className="text-neutral-500">Thank you for your purchase. Your order is being processed</p>
                <Link href="/products" className="text-blue-500 hover:underline">
                    Continue Shopping
                </Link>
            </div>
        </>
    );
}
