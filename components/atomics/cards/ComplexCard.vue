<script setup lang="ts">
import { type IComplexCardProps } from "@/types/components/CardProps";

defineProps<IComplexCardProps>();
</script>

<template lang="pug">
.card
  .card__header(v-if="$slots.header")
    slot(name="header", :item="item")
  .card__body(v-if="$slots.body")
    slot(name="body", :item="item")
  .card__footer(v-if="$slots.footer")
    slot(name="footer", :item="item")
</template>
