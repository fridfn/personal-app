import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
   alias: {
    '@': path.resolve(__dirname, './src'),
    'pages': path.resolve(__dirname, './src/pages')
   }
  },
  server: {
    fs: {
      strict: false,
    },
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
})
