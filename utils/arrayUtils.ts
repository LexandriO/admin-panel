import { type Ref } from "vue";
import { toValue } from "@vueuse/core";

function findIndexByKey<T, K extends keyof T>(array: Ref<T[]> | T[], key: K, value: number) {
  return toValue(array).findIndex((el) => el[key] === value);
}

export { findIndexByKey };
