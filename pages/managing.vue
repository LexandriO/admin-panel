<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import { ICONS } from "@/constants/icons";
import { Api } from "@/api/Api";
import { useProductForm } from "@/composables/useProductForm";
import { type IProduct } from "@/types/entities/Product";

definePageMeta({ middleware: ["auth", "admin-or-manager"] });

const api = new Api("/api");

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const {
  isSheetOpen,
  updatedProduct,
  openSheet,
  closeSheet,
  resetUpdatedProduct,
  setUpdatedProduct,
  saveProduct,
  removeProduct,
} = useProductForm(productStore);

function onClickEditProduct(product: IProduct) {
  openSheet();
  setUpdatedProduct(product);
}

function onCloseSheet() {
  closeSheet();
  resetUpdatedProduct();
}

onMounted(() => productStore.fetchProducts(api));
</script>

<template lang="pug">
.managing-page
  .managing-page__header
    h1 Управление каталогом
    TheButton(@click="openSheet") Добавить продукт

  .managing-page__body
    .managing-page__cards
      .managing-page__card(v-for="product in products", :key="product.id")
        ComplexCard(:item="product")
          template(#body="{ item }")
            .managing-page__card-body
              .managing-page__card-image
                img(:src="item.image", :alt="item.title")

              .managing-page__card-header-description
                .managing-page__card-header
                  h3 {{ item.title }}
                .managing-page__card-description
                  span {{ item.description }}

              .managing-page__card-actions
                .managing-edit-button(@click="onClickEditProduct(item)")
                  TheIcon(:name="ICONS.EDIT")
                .managing-page__delete-button(@click="removeProduct(item)")
                  TheIcon(:name="ICONS.DELETE")

teleport(to="body")
  SideSheet(:isOpen="isSheetOpen", @close="onCloseSheet")
    template(v-slot:header)
      .managing-page__side-sheet-header
        .managing-page__side-sheet-close-button(@click="onCloseSheet")
          TheIcon(:name="ICONS.CLOSE")
    template(v-slot:default)
      .managing-page__side-sheet-input-group
        TheInput(type="text", label="Заголовок", v-model="updatedProduct.title")
        TheInput(type="text", label="Описание", v-model="updatedProduct.description")
        TheInput(type="text", label="Адрес изображения", v-model="updatedProduct.image")
    template(v-slot:footer)
      .managing-page__side-sheet-actions
        TheButton(@click="saveProduct") Сохранить
        TheButton(@click="onCloseSheet") Отменить
</template>

<style lang="stylus" scoped>
.managing-page
  &__header
    margin-bottom 32px

  &__cards
    display flex
    flex-direction column
    gap 16px

  &__card-body
    display flex
    align-items center

  &__card-image
    width 100px
    height 100px
    margin-right 16px

    img
      border-radius 50%
      object-fit cover
      aspect-ratio 1 / 1

  &__side-sheet-header
    color: #fff
    margin-bottom 32px
    padding 16px

  &__side-sheet-input-group
    display flex
    flex-direction column
    gap 16px
    padding 16px

  &__side-sheet-actions
    display flex
    align-items center
    gap 16px
    padding 16px
</style>
