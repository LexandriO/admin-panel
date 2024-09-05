import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Проверяем, если пользователь не авторизован, то не пускаем его в админку
  if (!authStore.isAuthenticated || !authStore.authUser) {
    return navigateTo("/login");
  }

  return true;
});
// access control list
