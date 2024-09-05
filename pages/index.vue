<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { Api } from "@/api/Api";
import { useProductStore } from "@/stores/productStore";
import { ProductRepository } from "@/repositories/ProductRepository";

definePageMeta({ middleware: "auth" });

const api = new Api("/api");

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const productRepository = new ProductRepository();

const products = productRepository.index();

onMounted(() => productStore.fetchProducts(api));
</script>

<template lang="pug">
.catalog-page
  .catalog-page__header
    h1 Каталог

  .catalog-page__body
    .catalog-page__cards
      .catalog-page__card(v-for="product in products", :key="product.id")
        SimpleCard(v-bind="product")
</template>

<style lang="stylus" scoped>
.catalog-page
  &__header
    margin-bottom 32px

  &__cards
    display grid
    grid-template-columns repeat(3, 1fr)
    gap 16px
    flex-wrap wrap

  &__card
    max-width 450px
    transition all var(--transition-speed) var(--transition-animation)
    cursor pointer

    &:hover
      transform: skew(1deg);
</style>
