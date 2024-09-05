<template lang="pug">
form.form
  .form__header(v-if="$slots.header")
    slot(name="header")

  .form__body(v-if="$slots.body")
    slot(name="body")

  .form__footer(v-if="$slots.footer")
    slot(name="footer")
</template>

<style lang="stylus" scoped>
.form
  width 100%
  min-height 32px

  &__header
    margin-bottom 16px

  &__body
    margin-bottom 16px
</style>
