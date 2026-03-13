import { AdminHeader } from "@/components/admin/admin-header";
import { ProductsTable } from "@/components/admin/products-table";

export default function AdminProductsPage() {
  return (
    <>
      <AdminHeader />
      <main className="container py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-100">Produtos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie o catálogo completo de produtos do estoque
          </p>
        </div>
        <ProductsTable />
      </main>
    </>
  );
}
