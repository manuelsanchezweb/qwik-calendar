import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { type PWAOptions, qwikPwa } from "@qwikdev/pwa";

// const config: PWAOptions | undefined = process.env.CUSTOM_CONFIG === "true"
//  ? { config: true }
//     : undefined;

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikPwa()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
