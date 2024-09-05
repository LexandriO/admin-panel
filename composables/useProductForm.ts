import { ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { createProduct, updateProduct, deleteProduct } from "@/services/productService";
import { type IProduct } from "@/types/entities/Product";

export function useProductForm(productStore: ReturnType<typeof useProductStore>) {
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
    await deleteProduct(product.id);

    productStore.removeProduct(product);
  }

  async function saveProduct() {
    if (updatedProduct.value.id) {
      const product = await updateProduct(updatedProduct.value.id, updatedProduct.value);

      productStore.updateProduct(product);
    } else {
      const product = await createProduct(updatedProduct.value);

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
