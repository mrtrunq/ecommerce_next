import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { Button } from "@/components/ui/button";

interface IProps {
    product: Stripe.Product;
}

export default function ProductCart({ product }: IProps) {
    const price = product.default_price as Stripe.Price;

    return (
        <>
            <Link href={`/products/${product.id}`}>
                <Card>
                    {product.images && product.images[0] && (
                        <div className="relative h-80 w-full">
                            <Image priority alt={product.name} src={product.images[0]} layout="fill" className="object-contain transition-opacity duration-500 ease-in-out" />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                        </CardTitle>
                        <CardContent className="p-0">
                            {product.description && <p className="text-neutral-500">{product.description}</p>}
                            {price && price.unit_amount && <p>${(price.unit_amount / 100).toFixed(2)}</p>}
                        </CardContent>
                        <Button className="cursor-pointer">View Details</Button>
                    </CardHeader>
                </Card>
            </Link>
        </>
    );
}
