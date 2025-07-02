"use client";
import { checkoutAction } from "@/app/checkout/checkout-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
    const { items, addItem, removeItem } = useCartStore();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (total === 0 || items.length === 0) {
        return (
            <>
                <h1 className="text-center text-2xl font-bold">Your cart is empty</h1>
            </>
        );
    }

    return (
        <>
            <div className="mx-auto w-1/3 space-y-8">
                <h1 className="text-center text-3xl font-bold">Checkout</h1>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-extrabold">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <div className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span className="font-bold">${((item.price * item.quantity) / 100).toFixed(2)} </span>
                                    </div>
                                    <div className="space-x-4 border-b border-b-neutral-200 pb-2">
                                        <Button variant="outline" onClick={() => removeItem(item.id)}>
                                            -
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button variant="outline" onClick={() => addItem({ ...item, quantity: 1 })}>
                                            +
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 border-t border-t-neutral-300 py-2 font-bold">Total: ${(total / 100).toFixed(2)}</div>
                    </CardContent>
                </Card>
                <form action={checkoutAction}>
                    <Input type="hidden" name="items" value={JSON.stringify(items)} />
                    <Button type="submit" className="w-full">
                        Proceed to Payment
                    </Button>
                </form>
            </div>
        </>
    );
}
