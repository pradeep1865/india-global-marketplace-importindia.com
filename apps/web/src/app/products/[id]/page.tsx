import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ProductDetail } from "@/components/ProductDetail";
import { products } from "@/lib/mock-data";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  return (
    <AppShell>
      <ProductDetail product={product} />
    </AppShell>
  );
}
