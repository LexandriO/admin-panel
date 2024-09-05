<script setup lang="ts">
defineProps<{ name: string }>();
</script>

<template lang="pug">
Icon(:name="name", style="width: 2em; height: 2em;")
</template>
