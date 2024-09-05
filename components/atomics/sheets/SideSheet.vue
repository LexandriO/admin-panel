<template lang="pug">
transition(name="side-sheet")
  .side-sheet(v-if="isOpen")
    .sheet-backdrop(@click="$emit('close')")

    .side-sheet__content.flex.flex_column
      .side-sheet__header(v-if="$slots.header")
        slot(name="header")
      .side-sheet__body.overflow-y-auto.overflow-x-hidden
        slot(name="default")
      .side-sheet__footer(v-if="$slots.footer")
        slot(name="footer")
</template>

<script setup lang="ts">
defineEmits(["close"]);
withDefaults(defineProps<{ isOpen?: boolean }>(), { isOpen: false });
</script>

<style lang="stylus" scoped>
.sheet-backdrop
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 11
  background-color rgba(#000, 0.2)
  transition opacity 0.3s var(--transition-animation)

.side-sheet-enter-active,
.side-sheet-leave-active
  transition transform var(--transition-speed) var(--transition-animation)

.side-sheet-enter-from,
.side-sheet-leave-to
  transform translateX(100%)

.side-sheet
  position fixed
  top 0
  right 0
  left auto
  bottom 0
  z-index 10

  &__content
    position relative
    z-index 11
    width 700px
    height 100%
    background-color #000
    transition transform var(--transition-speed) var(--transition-animation)

  &__body
    position relative
    flex-grow 1
</style>
