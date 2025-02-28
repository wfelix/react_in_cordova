import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   build: {
//     outDir: 'www',
//   },
//   plugins: [react(), tailwindcss()],
// })


export default defineConfig(async () => {
  const { default: tailwindcss } = await import('@tailwindcss/vite');
  
  return {
    build: {
      outDir: 'www',
    },
    plugins: [
      react(),
      tailwindcss()
      // adicione outros plugins se necessário
    ],
    // outras configurações do Vite
  };
});