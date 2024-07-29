import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Замените на URL вашего приложения
    setupNodeEvents(on, config) {
      // Здесь можно настроить события и плагины
    },
    specPattern: 'cypress/e2e/**/*.{js,ts}', // Поддержка TypeScript
  },
});
