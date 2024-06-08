import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind({
    applyBaseStyles: false
  })],
  output: "server",
  adapter: netlify()
});