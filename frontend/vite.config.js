import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    
    // Development server configuration
    server: {
      host: '0.0.0.0',        // Bind to all network interfaces
      port: 5173,              // Default Vite port
      strictPort: false,       // Fallback to next port if busy
      open: false,             // Don't auto-open browser
      cors: true,              // Enable CORS for API requests
      hmr: {
        overlay: true,         // Show error overlay in browser
      },
    },
    
    // Preview server configuration (for production build preview)
    preview: {
      host: '0.0.0.0',        // Same settings for preview mode
      port: 4173,              // Default preview port
      strictPort: false,       // Fallback to next port if busy
      open: false,             // Don't auto-open browser
    },
    
    // Build configuration
    build: {
      outDir: 'dist',                        // Output directory
      sourcemap: mode === 'development',     // Generate sourcemaps in dev mode
      minify: 'esbuild',                     // Use esbuild for fast minification
      target: 'es2015',                      // Browser compatibility target
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer-motion': ['framer-motion'],
          },
        },
      },
    },
  }
})
