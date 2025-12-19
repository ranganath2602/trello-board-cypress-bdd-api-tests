# Trello Board API Tests

This project contains a test suite for the Trello Board API using Cypress and Cucumber with TypeScript. The tests are designed to validate various operations related to Trello boards, ensuring that the API behaves as expected.

## Continuous Integration (GitHub Actions) ✅

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that:

- Installs Node dependencies and caches npm
- Runs TypeScript checks and the headless Cypress suite (`npm run test:headless`)
- Uploads any Cypress videos and screenshots as artifacts
- Optionally creates a GitHub Release when a tag is pushed (includes artifacts)

Before enabling CI you must add the following repository secrets (Settings → Secrets):

- `TRELLO_KEY` — your Trello API key
- `TRELLO_TOKEN` — your Trello API token

After adding secrets, GitHub Actions will run on pushes and PRs targeting `main`.

Badge (shows workflow status):

[![CI](https://github.com/rogercopy/trello-board-cypress-bdd-api-tests/actions/workflows/ci.yml/badge.svg)](https://github.com/rogercopy/trello-board-cypress-bdd-api-tests/actions/workflows/ci.yml)

## Project Structure

```
trello-board-api-tests
├── cypress
│   ├── e2e
│   │   ├── features
│   │   │   └── boards.feature
│   │   └── step_definitions
│   │       └── boards.steps.ts
│   ├── fixtures
│   │   └── board.json
│   └── support
│       ├── commands.ts
│       └── index.ts
├── src
│   ├── api
│   │   └── trelloClient.ts
│   ├── types
│   │   └── trello.ts
│   └── utils
│       └── auth.ts
├── .env.example
├── cypress.config.ts
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd trello-board-api-tests
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required API keys and tokens.

4. **Run the tests:**
   ```
   npx cypress open
   ```
   or for headless mode:
   ```
   npx cypress run
   ```

## Usage

The test suite includes feature files that describe the scenarios for testing the Trello Boards API. Each scenario is implemented in the corresponding step definitions file.

### Example Scenarios

- Creating a new board
- Retrieving board details
- Updating a board
- Deleting a board

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.