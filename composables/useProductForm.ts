import { ref } from "vue";
import { ProductRepository } from "@/repositories/ProductRepository";
import { useProductStore } from "@/stores/productStore";
import { type IProduct } from "@/types/entities/Product";

export function useProductForm() {
  const productRepository = new ProductRepository();

  const productStore = useProductStore();

  const isSheetOpen = ref(false);
  const updatedProduct = ref<Partial<IProduct>>({});

  function openSheet() {
    isSheetOpen.value = true;
  }

  function closeSheet() {
    isSheetOpen.value = false;
    resetUpdatedProduct();
  }

  function resetUpdatedProduct() {
    updatedProduct.value = {};
  }

  function setUpdatedProduct(product: IProduct) {
    updatedProduct.value = { ...product };
  }

  async function removeProduct(product: IProduct) {
    await productRepository.delete(product.id as number);

    productStore.removeProduct(product);
  }

  async function saveProduct() {
    if (updatedProduct.value.id) {
      const product = await productRepository.update(updatedProduct.value.id, updatedProduct.value as IProduct);

      productStore.updateProduct(product);
    } else {
      const product = await productRepository.store(updatedProduct.value as IProduct);

      productStore.addProduct(product);
    }

    closeSheet();
  }

  return {
    isSheetOpen,
    updatedProduct,
    openSheet,
    closeSheet,
    resetUpdatedProduct,
    setUpdatedProduct,
    saveProduct,
    removeProduct,
  };
}
