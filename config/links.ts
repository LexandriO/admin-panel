import { ICONS } from "@/constants/icons";
import { type ILink } from "@/types/entities/Link";

const links: ILink[] = [
  {
    to: "/",
    title: "Каталог",
    allowedTo: ["admin", "manager", "user"],
    icon: ICONS.CATALOG,
  },
  {
    to: "/users",
    title: "Список пользователей",
    allowedTo: ["admin"],
    icon: ICONS.USERS,
  },
  {
    to: "/managing",
    title: "Управление каталогом",
    allowedTo: ["admin", "manager"],
    icon: ICONS.MANAGING,
  },
  {
    to: "/profile",
    title: "Профиль",
    allowedTo: ["admin", "manager", "user"],
    icon: ICONS.PROFILE,
  },
];

export { links };
