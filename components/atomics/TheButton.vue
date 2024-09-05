<script setup lang="ts">
import { computed } from "vue";
import { type IButtonProps } from "@/types/components/ButtonProps";

defineEmits(["click"]);
const props = withDefaults(defineProps<IButtonProps>(), {
  size: "small",
  color: "white",
  fullWidth: false,
});

const className = computed(() => [`button_${props.size}`, `button_${props.color}`, props.fullWidth && "full-width"]);
</script>

<template lang="pug">
button.button(:class="className", @click="$emit('click', $event)")
  .button__label(v-if="$slots.default")
    slot
</template>

<style lang="stylus" scoped>
.button
  padding 4px 16px
  border-radius 4px
  border none
  background-color transparent
  cursor pointer
  transition all 0.15s ease-out

  &__label
    text-transform uppercase

  // Size
  &_small
    height 32px
    min-width 32px

  &_medium
    height 36px
    min-width 36px

  &_large
    height 38px
    min-width 38px

  // Colors
  &_white
    background-color #fff
    color #424242

    &:hover
      background-color: rgba(#f3f3f3, .64);

  &_black
    background-color #000
    color #f3f3f3

    &:hover
      background-color: rgba(#424242, .64);
</style>
