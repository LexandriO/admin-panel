<script setup lang="ts">
import { type ILinkProps } from "@/types/components/LinkProps";

defineProps<ILinkProps>();
</script>

<template lang="pug">
NuxtLink.link(:to="to", active-class="active")
  .link__icon
    TheIcon(:name="icon")
  .link__title
    span {{ title }}
</template>

<style lang="stylus" scoped>
.link
  position relative
  display flex
  align-items center
  gap 16px
  text-transform uppercase
  text-decoration none
  color #2196f3

  &::before
    content ""
    position absolute
    bottom -6px
    left 0
    height 2px
    width 0
    background-color #f3f3f3
    transition width var(--transition-speed) var(--transition-animation)

  &:hover
    &::before
      width 100%

.active
  color #f3f3f3
</style>
