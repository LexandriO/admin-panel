<script setup lang="ts">
import { onMounted } from "vue";
import { Api } from "@/api/Api";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";

definePageMeta({ middleware: ["auth", "admin"] });

const api = new Api("/api");

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

onMounted(() => {
  userStore.fetchUsers(api);
});
</script>

<template lang="pug">
.users-page
  .users-page__header
    h1 Пользователи

  .users-page__body
    .users-page__cards
      .users-page__card(v-for="user in users", :key="users.id")
        SimpleCard(:title="user.username", :image="user.avatar")
</template>

<style lang="stylus" scoped>
.users-page
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

    &:hover
      transform: skew(1deg);
</style>
