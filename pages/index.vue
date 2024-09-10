<script setup lang="ts">
import { ProductRepository } from "@/repositories/ProductRepository";

definePageMeta({ middleware: "auth" });

const productRepository = new ProductRepository();

const products = await productRepository.index();
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
