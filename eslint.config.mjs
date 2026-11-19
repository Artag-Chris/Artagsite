// Native flat config. eslint-config-next >= 16 ships flat configs directly;
// wrapping it in FlatCompat caused "Converting circular structure to JSON".
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".agents/**",
      "public/**",
      "scripts/**",
      "test-results/**",
      "playwright-report/**",
      "next-env.d.ts",
      "tailwind.config.js",
      "postcss.config.*",
    ],
  },
  ...nextVitals,
  ...nextTs,
  {
    // This project runs Next 15 without the React Compiler enabled; disable
    // React Compiler-specific hook rules bundled with eslint-config-next 16,
    // and keep stylistic JSX entity escaping non-blocking.
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // Third-party pixel bootstrap snippets (Meta / TikTok) use vendor-provided
    // IIFEs with `arguments` and untyped global queues.
    files: [
      "src/components/meta/MetaPixel.tsx",
      "src/components/tiktok/TikTokPixel.tsx",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "prefer-rest-params": "off",
    },
  },
  {
    // Mount-once loader timers and external dynamic avatars.
    files: [
      "src/components/loading/**",
      "src/components/compontents/GlowCard.tsx",
      "src/components/sub-sections/TestimonialAvatar.tsx",
    ],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
