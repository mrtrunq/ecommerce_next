"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import Stripe from "stripe";

interface IProps {
    products: Stripe.Product[];
}

export default function Carousel({ products }: IProps) {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [products.length]);
    const currentProduct = products[current];
    const price = currentProduct.default_price as Stripe.Price;

    return (
        <>
            <Card className="relative">
                {currentProduct.images && currentProduct.images[0] && (
                    <div className="relative h-80 w-full">
                        <Image priority alt={currentProduct.name} src={currentProduct.images[0]} layout="fill" className="object-contain transition-opacity duration-500 ease-in-out" />
                    </div>
                )}
                <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <CardTitle className="text-3xl font-bold">{currentProduct.name}</CardTitle>
                    {price && price.unit_amount && <p>${(price.unit_amount / 100).toFixed(2)}</p>}
                </CardContent>
            </Card>
        </>
    );
}
