import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".next-dev/**",
      "node_modules/**",
      "dist/**",
      "out/**",
    ],
  },
  ...nextConfig,
];

export default eslintConfig;

