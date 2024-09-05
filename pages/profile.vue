<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

definePageMeta({ middleware: "auth" });

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);
</script>

<template lang="pug">
.profile-page
  .profile-page__header
    h1 Профиль польозвателя: {{ authUser?.username }}

  .profile-page__body
    span Роль пользователя: {{ authUser?.role }}
    img(:src="authUser?.avatar", :alt="authUser?.username")
</template>
