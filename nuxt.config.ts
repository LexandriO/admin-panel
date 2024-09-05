// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Alexander | Alt.point",
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
    },
  },
  ssr: false,
  css: ["~/assets/styles/index.styl", "~/assets/styles/vars.styl"],
  components: [
    "@/components",
    "@/components/atomics",
    "@/components/atomics/cards",
    "@/components/atomics/sheets",
    "@/components/atomics/table",
    "@/components/compounds",
  ],
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxt/icon"],
  compatibilityDate: "2024-04-03",
});
