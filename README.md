
# AMEX Challenge Exercise

[Git Repository](https://github.com/rafaelleiv/amex-challenge-exercise)

## Description

This is an exercise to evaluate my skills as a Full-Stack developer regarding upcoming interview process.

## Installation

```bash
$ npm install
```
## Docker containers
To run the project in a docker container, you must have docker installed on your machine.

```bash
$ docker-compose up
```
> TODO adds a docker-compose file and instructions for running the app in a container in case is needed.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 > TODO add scripts and environments for the above commands

### Testing with Jest

This project uses **Jest** for unit testing with TypeScript and React. The tests are located in the `tests` folder within each module or in other locations following the `*.test.tsx` or `*.spec.tsx` naming conventions.

#### Running Tests

To run all tests:

```bash
    npm run test
```

## Linting and Code Formatting

This project uses ESLint and Prettier to enforce a consistent code style. You can run the following command to check for linting errors:

* **ESLint** is used to identify and fix potential issues in the code, such as unused variables, best practices, and React-specific rules. It helps maintain code quality by enforcing coding standards.

* **Prettier** is used to automatically format the code to maintain a consistent style across the project. It handles aspects like indentation, spaces, line lengths, and other formatting concerns.

* Using both tools together ensures that the codebase is not only error-free but also cleanly formatted, improving readability and maintainability.

#### Commands

* Lint the code:

    ```bash
    npm run lint
    ```
  Analyzes the code for potential issues using ESLint.
  <br><br>
* Fix linting issues:

    ```bash
    npm run lint:fix
    ```
  Automatically fixes linting issues using ESLint.

### Automated Code Quality with Husky

This project uses **Husky** to run validations before committing code, ensuring that only quality code is pushed to the repository. Husky runs **linting** and **tests** before allowing commits.

Husky is automatically configured when you run `npm install`, thanks to the `prepare` script in `package.json`. No manual setup is required.

- **Pre-commit Hook**: Validates code quality by running `npm run lint` and `npm run test` before each commit.
- If any of these commands fail, the commit will be blocked until the issues are resolved.

### Continuous Integration and Deployment (CI/CD)

This project uses GitHub Actions for automated Continuous Integration (CI). The workflow ensures that every code change is validated before being merged into the main branch, helping to maintain code quality and stability.

The CI workflow includes the following steps:
* **Linting**: Runs npm run lint to ensure code follows style and quality guidelines.
* **Testing**: Executes npm run test to verify that all tests pass before changes are accepted.
* **Build**: Compiles the project using npm run build to ensure it can be built successfully.

The workflow is triggered on every push or pull request to the main branch, ensuring that all new code is thoroughly checked and ready for deployment.

### Support friendly URLs for module imports

#### How to set up path mapping
We need to set up path mapping in the `tsconfig.json` file to support friendly URLs for module imports. This allows us to import modules using a shorter, more readable path instead of the full relative path.
```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "components/*": ["src/components/*"],
      "utils/*": ["src/utils/*"],
      "hooks/*": ["src/hooks/*"]
    }
  }
}
```
> TODO add the above configuration to the `tsconfig.json` file.

### Swagger API Documentation

This project uses **Swagger** to generate API documentation automatically. Swagger is a powerful tool that simplifies the process of documenting APIs by generating interactive documentation from the code itself.

### Improvements Features

 ##### Cache
  While an in-memory cache (like the one I used with a simple JavaScript object) can work for basic exercise, it has some limitations, such as:

    - Cache Persistence 
    - Scalability
    - Consistency

  Alternative Approaches for Caching in a React App could be:
     
    - Local Storage
    - Session Storage
    - IndexedDB
    - Service Workers
    - Redux Persist

### Known Issues

- Swagger UI is not working properly. The plugin fastify-swagger-ui seems to be looking for static file logo.svg in the root of the project. I can't find right now in the config how to remove this behavior.
- The server.test.ts file is not working properly. I'm having some issues with the fastify instance. I would need more time to fix it. The test has been disabled for now.

### Stay in touch

- Author - [Rafael Leyva](https://github.com/rafaelleiv)

### License

Free to use and modify. 
