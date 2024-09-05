<template lang="pug">
.auth-layout
  .auth-layout__body
    slot
</template>

<style lang="stylus" scoped>
.auth-layout
  display flex
  flex-direction column
  justify-content center
  align-items center
  min-height 100dvh

  &__body
    width 100%
    display flex
    align-items center
    justify-content center
    flex-grow 1
    margin 0 auto
    padding 32px
</style>
