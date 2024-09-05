<template lang="pug">
transition(name="bottom-sheet")
  .bottom-sheet(v-if="sheetShowed")
    .sheet-backdrop(@click="$emit('close')")

    .bottom-sheet__content.flex.flex_column(:class="bottomSheetContentClassName")
      .bottom-sheet__header(v-if="$slots.header")
        slot(name="header")
      .bottom-sheet__body.overflow-y-auto.overflow-x-hidden
        slot(name="default")
      .bottom-sheet__footer(v-if="$slots.footer")
        slot(name="footer")
</template>

<script setup lang="ts">
import { computed } from "vue";

defineEmits(["close"]);
const props = withDefaults(defineProps<{ sheetShowed?: boolean; fullHeight?: boolean }>(), {
  sheetShowed: false,
  fullHeight: false,
});

const bottomSheetContentClassName = computed(() => [props.fullHeight && `bottom-sheet__content_full-height`]);
</script>

<style lang="stylus" scoped>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active
  transition transform var(--transition-speed) var(--transition-animation)


.bottom-sheet-enter-from,
.bottom-sheet-leave-to
  .bottom-sheet__content
    top 100%

.bottom-sheet
  &__content
    position fixed
    top 35%
    bottom 0
    left 0
    right 0
    width 100%
    z-index 11
    background-color var(--color-white)
    transition top var(--transition-speed) var(--transition-animation)
    border-top-left-radius: 8px
    border-top-right-radius: 8px

    &_full-height
      top 0

  &__body
    position relative
    flex-grow 1
</style>
