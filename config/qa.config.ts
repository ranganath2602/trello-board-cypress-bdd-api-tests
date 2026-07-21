import { defineConfig } from "cypress"
import defu from "defu"
import defaultConfig from "../cypress.config"

export default defineConfig(
    defu(
        {
            env: {
                environment: "qa",
                baseUrlBoards: "https://api.trello.com/1"
            },
            e2e: {
                baseUrl: "https://api.trello.com",
                fixturesFolder: "fixtures",
                retries: {
                    runMode: 0,
                    openMode: 0
                },
                failOnStatusCode: false
            },
        },
        defaultConfig
    )
)
