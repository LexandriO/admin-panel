import { ref } from "vue";
import { defineStore } from "pinia";
import { type Api } from "@/api/Api";
import { type IProduct } from "@/types/entities/Product";
import { findIndexByKey } from "@/utils/arrayUtils";

const useProductStore = defineStore("alt-point/product", () => {
  const isLoading = ref(false);

  const product = ref<IProduct | null>(null);
  const products = ref<IProduct[]>([]);

  const _products = new Map<number, IProduct>();

  function $reset() {
    product.value = null;
    products.value = [];
  }

  async function fetchProducts(api: Api) {
    isLoading.value = true;

    try {
      const products = (await api.get("/products")) as IProduct[];

      products.forEach(addProduct);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  function addProduct(product: IProduct) {
    const id = product.id;

    if (_products.has(id)) return;

    _products.set(id, { ...product });

    products.value.push(product);
  }

  function removeProduct(product: IProduct) {
    const id = product.id;

    if (!_products.has(id)) return;

    _products.delete(id);

    const index = findIndexByKey(products, "id", id);

    products.value.splice(index, 1);
  }

  function updateProduct(product: IProduct) {
    const id = product.id;

    if (!_products.has(id)) return;

    _products.set(id, { ...product });

    const index = findIndexByKey(products, "id", id);

    products.value[index] = { ...product };
  }

  return { product, products, $reset, addProduct, removeProduct, updateProduct, fetchProducts };
});

export { useProductStore };
