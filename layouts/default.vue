<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { links } from "@/config/links";

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);
const { logout } = authStore;

const accessibleLinks = computed(() => {
  if (!authUser.value) {
    return [];
  }

  return links.filter(({ allowedTo }) => allowedTo.includes(authUser.value!.role));
});

function onLogout() {
  try {
    logout();
    navigateTo("/login");
  } catch (error) {
    console.error(error);
  }
}
</script>

<template lang="pug">
.default-layout
  .default-layout__sidebar
    TheSidebar(:links="accessibleLinks", @click-logout-button="onLogout")

  .default-layout__body
    slot
</template>

<style lang="stylus" scoped>
.default-layout
  display flex
  min-height 100dvh

  &__sidebar
    position sticky
    top 0
    height 100dvh

  &__body
    width 100%
    flex-grow 1
    margin 0 auto
    padding 32px
</style>
