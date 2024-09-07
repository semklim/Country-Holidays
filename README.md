# Country Info Angular Application

This project use Angular version 15.2.6.
Project created to solve task from interview.

This Angular application provides information about countries, their holidays, and neighboring countries using the [Nager.Date API](https://date.nager.at/swagger/index.html). Users can search for countries, view details about their holidays, and see neighboring countries.

## Table of Contents

1. [Features](#features)
2. [Architecture Overview](#architecture-overview)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Building the Application](#building-the-application)
6. [Libraries and Frameworks Used](#libraries-and-frameworks-used)

## Features

- **Country Search**: Search for countries by name and navigate to their details page.
- **Country Details**: View public holidays for a selected country and year.
- **Random Countries Widget**: Displays the next public holiday for three random countries.
- **Year Switching**: Easily switch between different years to view holidays for that period.
- **Error Handling**: Provides meaningful error messages for network issues, invalid data, etc.
- **404 Page**: A user-friendly "Page Not Found" screen for undefined routes.
- **SEO**: The application is optimized for search engines and social media sharing.

## Architecture Overview

The application is built with Angular and follows a component-based architecture. Key components and services are:

- **HomeComponent**: Handles the search functionality and displays random country holidays.
- **CountryComponent**: Displays details about a selected country's holidays.
- **CountryService**: Handles all HTTP requests to the Nager.Date API.
- **Error Handling Service**: Manages application-wide error handling and displays appropriate messages.
- **PageNotFoundComponent**: Shows a custom 404 page for unmatched routes.

The app uses Angular Router for navigation and Bootstrap for styling. All API interactions are encapsulated in a dedicated service (`CountryService`).

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/semklim/Country-Holidays.git
    cd country-holidays
    ```

2. **Install Dependencies**:

    Clean install all the necessary packages using `npm`:

    ```bash
    npm ci
    ```

    Ensure you have Node.js and npm installed on your machine. You can check the versions by running:

    ```bash
    node -v
    npm -v
    ```

## Running the Application

To run the application in development mode, use:

```bash
npm start
```

The application will be available at http://localhost:4200/.

## Running with a Specific Port

If you want to run the app on a different port:

```bash
ng serve --port 4300
```

## Building the Application

To build the application for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/country-holidays` directory. You can serve the built application using any static file server.

## Libraries and Frameworks Used

- **Angular**: Front-end framework for building dynamic web applications.
- **Bootstrap**: For responsive design and styling.
- **Angular Router**: For handling routing and navigation.
- **RxJS**: Reactive programming library for handling asynchronous data streams.
- **Jest**: Testing framework.
- **Husky**: For managing Git hooks.
- **Lint-staged**: Runs linters on Git staged files.
- **Prettier**: Code formatter.
- **ESLint**: Linting utility.

## ESLint and Code Style
The project follows the Airbnb TypeScript Style Guide for consistent and clean code. The ESLint configuration is set up with the following:

- **Airbnb TypeScript Style Guide**: Provides a comprehensive set of rules and best practices for writing clean and maintainable TypeScript code. The guide helps ensure consistency across the project.
- **Prettier Integration**: Prettier is integrated with ESLint to handle code formatting. The rules are defined to avoid conflicts between ESLint and Prettier, making sure that both tools work seamlessly together.

- **ESLint Plugins**:
  - **eslint-plugin-import**: Helps validate proper imports and prevent potential import/export errors.
  - **eslint-plugin-jest**: Provides rules specific to Jest for better test code quality.
  - **@typescript-eslint/eslint-plugin**: Adds TypeScript support for ESLint.
  - **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier.
  - **eslint-plugin-prettier**: Allows running Prettier as an ESLint rule and reporting formatting errors as ESLint issues.

To customize or adjust the ESLint rules, modify the .eslintrc configuration file according to your team's coding standards.
