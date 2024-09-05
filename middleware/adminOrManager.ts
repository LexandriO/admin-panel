import { UserRoleEnum } from "@/types/enums/UserRole";
import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  const userRole = authStore.authUser!.role;
  const adminOrManager = [UserRoleEnum.ADMIN, UserRoleEnum.MANAGER];

  // Проверяем попытку перехода на страницу /managing без роли admin или manager
  if (to.path === "/managing" && !adminOrManager.includes(userRole)) {
    return navigateTo("/profile");
  }

  return true;
});
