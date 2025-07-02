"use client";
import ProductCart from "@/components/product-cart";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Stripe from "stripe";

interface IProps {
    products: Stripe.Product[];
}

export default function ProductList({ products }: IProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredProduct = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(term);
        const descriptionMatch = product.description ? product.description.toLowerCase().includes(term) : false;
        return nameMatch || descriptionMatch;
    });

    return (
        <>
            <div>
                <Input type="text" placeholder="Search products..." value={searchTerm} className="mx-auto mb-6 w-1/3" onChange={(e) => setSearchTerm(e.target.value)}></Input>
                <ul className="grid grid-cols-3 gap-4">
                    {filteredProduct.map((product, index) => (
                        <li key={index}>
                            <ProductCart product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
