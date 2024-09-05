import { UserRoleEnum } from "@/types/enums/UserRole";
import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  const userRole = authStore.authUser!.role;

  // Проверяем попытку перехода на страницу /users без роли admin
  if (to.path === "/users" && userRole !== UserRoleEnum.ADMIN) {
    return navigateTo("/profile");
  }

  return true;
});
