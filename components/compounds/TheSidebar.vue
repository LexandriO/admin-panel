<script setup lang="ts">
import { ref, computed } from "vue";
import { ICONS } from "@/constants/icons";
import { type ILink } from "@/types/entities/Link";

defineProps<{ links: ILink[] }>();

const isSidebarCollapsed = ref(false);

const className = computed(() => [isSidebarCollapsed.value && "sidebar_collapsed"]);
const collapseIcon = computed(() => (isSidebarCollapsed.value ? ICONS.MENU_CLOSE : ICONS.MENU_OPEN));

function toggleSidebarCollapse() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}
</script>

<template lang="pug">
aside.sidebar(:class="className")
  ul.sidebar__links
    li.sidebar__link(v-for="link in links", :key="link.to")
      TheLink(:to="link.to", :title="link.title", :icon="link.icon")

  .sidebar__actions
    .sidebar__collapse-button(@click="toggleSidebarCollapse")
      TheIcon(:name="collapseIcon")
    .sidebar__logout-button(@click="$emit('click-logout-button')")
      TheIcon(:name="ICONS.LOGOUT")
</template>

<style lang="stylus" scoped>
.sidebar
  height 100%
  width 400px
  display flex
  flex-direction column
  position relative
  padding 16px 32px
  background-color #424242
  transition width var(--transition-speed) var(--transition-animation)

  &_collapsed
    width 100px

    .sidebar__action img
      transform rotate(180deg)

  &__links
    display flex
    flex-direction column
    justify-content center
    height 100%
    gap 16px
    overflow hidden

  &__collapse-button
    display flex
    position absolute
    right 25px
    top 16px
    border-radius 50%
    padding 8px
    cursor pointer

  &__logout-button
    width max-content
    display flex
    cursor pointer
    color #2196f3
    transition color var(--transition-speed) var(--transition-animation)

    &:hover
      color #f3f3f3
</style>
