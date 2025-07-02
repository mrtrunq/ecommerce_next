"use client";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

interface IProps {
    product: Stripe.Product;
}

export default function ProductDetails({ product }: IProps) {
    const { items, addItem, removeItem } = useCartStore();
    const price = product.default_price as Stripe.Price;
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1,
        });
    };

    return (
        <>
            <div className="mt-10 grid grid-cols-2">
                {product.images && product.images[0] && (
                    <div className="relative h-80 w-full">
                        <Image priority alt={product.name} src={product.images[0]} layout="fill" className="object-contain transition-opacity duration-500 ease-in-out" />
                    </div>
                )}
                <div className="ml-40 flex flex-col justify-center gap-2">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    {product.description && <p className="text-neutral-500">{product.description}</p>}
                    {price && price.unit_amount && <p className="font-semibold">${(price.unit_amount / 100).toFixed(2)}</p>}
                    <div className="space-x-4">
                        <Button variant="outline" onClick={() => removeItem(product.id)}>
                            -
                        </Button>
                        <span>{quantity}</span>
                        <Button onClick={onAddItem}>+</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
