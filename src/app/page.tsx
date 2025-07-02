import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const products = await stripe.products.list({
        expand: ["data.default_price"],
        limit: 5,
    });

    return (
        <>
            <div className="space-y-8">
                <section className="flex items-center justify-around bg-neutral-100 py-8 sm:py-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Welcome to My E-Commerce</h2>
                        <p className="text-neutral-500">Discover the latest products at the best prices</p>
                        <Button asChild variant="default" className="rounded-full">
                            <Link href="products">Browse All Products</Link>
                        </Button>
                    </div>
                    <Image alt="Banner Image" width={450} height={450} src={products.data[0].images[0]} priority />
                </section>
                <section>
                    <Carousel products={products.data} />
                </section>
            </div>
        </>
    );
}
