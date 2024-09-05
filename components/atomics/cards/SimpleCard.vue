<script setup lang="ts">
import { type ISimpleCardProps } from "@/types/components/CardProps";

defineProps<ISimpleCardProps>();
</script>

<template lang="pug">
.card
  .card__header
    h3 {{ title }}

  .card__body
    .card__image(v-if="image")
      img(:src="image", :alt="title")

    .card__description
      p {{ description }}

  .card__footer
    .card__price(v-if="info")
      span {{ info }}
</template>

<style lang="stylus" scoped>
.card
  max-width 360px
  max-height 480px
  overflow hidden

  &__header
    height 72px
    padding 12px 16px

  &__image
    height 188px
    margin-bottom 16px
    object-fit cover
</style>
