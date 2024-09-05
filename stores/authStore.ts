import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import type { Api } from "@/api/Api";
import type { IUserCredentials, IUser } from "@/types/entities/user/User";

const useAuthStore = defineStore(
  "alt-point/auth",
  () => {
    const isLoading = ref(false);
    const isAuthenticated = ref(false);

    const authUser = ref<IUser | null>(null);
    const userCredentials: IUserCredentials = reactive({
      login: "",
      password: "",
    });

    function $reset() {
      authUser.value = null;
      isAuthenticated.value = false;
    }

    function setAuthUser(user: IUser) {
      isAuthenticated.value = true;
      authUser.value = user;
    }

    function logout() {
      $reset();
    }

    async function login(api: Api) {
      try {
        isLoading.value = true;

        const user = (await api.post("/users", userCredentials)) as IUser;

        setAuthUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    }

    return { isAuthenticated, authUser, userCredentials, $reset, setAuthUser, logout, login };
  },
  { persist: true }
);

export { useAuthStore };
