<script setup lang="ts">
import { Api } from "@/api/Api";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

definePageMeta({ layout: "auth" });

const api = new Api("/api");

const authStore = useAuthStore();
const { userCredentials } = storeToRefs(authStore);

async function onSubmit() {
  await authStore.login(api);
  navigateTo("/");
}
</script>

<template lang="pug">
.login-page
  .login-page__form
    TheForm(@submit.prevent="onSubmit")
      template(#header)
        .login-page__form-header
          h2 Добро пожаловать в админ панель

      template(#body)
        .login-page__form-input-group
          .login-page__form-input
            TheInput(label="Логин", type="text", v-model="userCredentials.login")
          .login-page__form-input
            TheInput(label="Пароль", type="password", v-model="userCredentials.password")

      template(#footer)
        .login-page__form-action
          TheButton(full-width) Войти
</template>

<style lang="stylus" scoped>
.login-page
  &__form
    max-width 500px

  &__form-header
    text-align center

  &__form-input-group
    display flex
    flex-direction column
    gap 16px
</style>
