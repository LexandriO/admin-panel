<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{ label: string; type: string; modelValue: any }>();

const hasContent = ref(false);

const inputClassName = computed(() => [hasContent.value && "has_content"]);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;

  hasContent.value = !!target.value.trim();

  emits("update:modelValue", target.value);
}

onMounted(() => {
  hasContent.value = !!props.modelValue;
});
</script>

<template lang="pug">
.input
  input.input__animation(:class="inputClassName", :type="type", :value="modelValue", @input="onInput")
  label.input__label {{ label }}
</template>

<style lang="stylus" scoped>
.input
  position: relative;

  input
    color #ffffff
    width 100%
    letter-spacing 1px

  &__label
    pointer-events none

  &__animation
    border 0
    padding 4px 0
    border-bottom 1px solid #ccc
    background-color transparent

    &:focus
      outline: none

  &__animation ~ label
    position absolute
    left 0
    top 5px
    color rgba(255, 255, 255, 0.5)
    transition 0.15s ease-out
    letter-spacing 0.5px

  &__animation:focus ~ label,
  .has_content.input__animation ~ label
    top -12px
    font-size 10px
    color #ffffff
    transition 0.15s ease-out
</style>
