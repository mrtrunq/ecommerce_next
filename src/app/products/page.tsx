import ProductList from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
    const products = await stripe.products.list({
        expand: ["data.default_price"],
        limit: 10,
    });

    return (
        <>
            <div>
                <h1 className="mx-auto mb-8 text-center text-3xl font-bold">All Products</h1>
                <ProductList products={products.data} />
            </div>
        </>
    );
}
