import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  esbuild: {
    loader: "jsx", // OR "tsx"
    include: [
      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",
      // ... and so on for .ts files if needed
    ],
  },
})

// export default defineConfig({
//   plugins: [react()],
// })

// export default {
//   // config options
// server:{
//   allowedHosts:true,
//   esbuildOptions: {
//     loader: {
//       '.js': 'jsx',
//     },
//   },
//   }
// }

