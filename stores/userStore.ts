import { ref } from "vue";
import { defineStore } from "pinia";
import { type Api } from "@/api/Api";
import { type IUser } from "@/types/entities/user/User";

const useUserStore = defineStore("alt-point/user", () => {
  const isLoading = ref(false);

  const users = ref<IUser[]>([]);

  function $reset() {
    users.value = [];
  }

  function setUsers(incomeUsers: IUser[]) {
    users.value = incomeUsers;
  }

  async function fetchUsers(api: Api) {
    isLoading.value = true;

    try {
      const users = (await api.get("/users")) as IUser[];

      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  return { users, $reset, setUsers, fetchUsers };
});

export { useUserStore };
