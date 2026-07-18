import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import localContentUpload from "./src/integrations/localContentUpload.mjs";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  integrations: [mdx(), react(), localContentUpload()],
  site: "https://suisuigallery.netlify.app",
  adapter: cloudflare()
});