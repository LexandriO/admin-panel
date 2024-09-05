import { Api } from "@/api/Api";
import { type IProduct } from "@/types/entities/Product";

const api = new Api("/api");

export async function createProduct(product: Partial<IProduct>) {
  const { product: createdProduct } = await api.post<{ message: string; product: IProduct }>("/products", product);

  return createdProduct;
}

export async function updateProduct(productId: number, product: Partial<IProduct>) {
  const { product: updatedProduct } = await api.put<{ message: string; product: IProduct }>(
    `/products/${productId}`,
    product
  );

  return updatedProduct;
}

export async function deleteProduct(productId: number) {
  await api.delete(`/products/${productId}`);
}
