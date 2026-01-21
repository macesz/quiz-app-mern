/* eslint-disable no-unused-vars */
import { defineConfig } from 'vite'
import http from "http";
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
        }
      },
      cors: true
    },
    plugins: [react()],
  }
})