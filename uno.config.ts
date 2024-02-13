import { defineConfig, presetUno, presetWebFonts, presetWind } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['resources/views/**/*.edge'],
  },
  presets: [
    presetUno(),
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: {
          provider: 'bunny',
          name: 'DM Sans',
        },
      },
    }),
  ],
})
