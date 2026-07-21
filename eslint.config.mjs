import typescriptEslint from "@typescript-eslint/eslint-plugin"
import cypress from "eslint-plugin-cypress"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default [{
    ignores: ["**/node_modules", "**/dist"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        cypress,
    },

    languageOptions: {
        globals: {
            ...cypress.environments.globals.globals,
        },

        parser: tsParser,
    },

    rules: {
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/assertion-before-screenshot": "error",
        "cypress/no-force": "error",
        "cypress/no-async-tests": "error",
        "cypress/no-pause": "error",
        "no-irregular-whitespace": "error",
        "no-trailing-spaces": "error",
        "no-whitespace-before-property": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "eol-last": ["error", "always"],
        "@typescript-eslint/no-unused-expressions": "off",
        semi: ["error", "never"],
        "object-curly-spacing": ["error", "always"],
    },
}]
