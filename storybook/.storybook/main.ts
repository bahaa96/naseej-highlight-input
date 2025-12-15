import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/react-vite",
  viteFinal: async (viteConfig) => {
    // Adjust this if you serve Storybook from a subpath; '/' is fine for local dev
    viteConfig.base = "/";
    return viteConfig;
  },
};
export default config;
