// Import the dotenv package
// This will load the variables from your .env file into process.env
require('dotenv').config();

// --- config.js ---

// This module exports all the application configuration.
// It retrieves values from environment variables.
// If a variable is not set, it may provide a default value.

const config = {
  // Application port. Defaults to 3000 if not specified.
  port: process.env.PORT || 3000,

  // Database connection URL.
  // It's crucial to have this in your .env file for security.
  databaseUrl: process.env.DATABASE_URL,

  // API Key for a third-party service.
  apiKey: process.env.API_KEY,

  // Node environment. Defaults to 'development'.
  // Can be set to 'production', 'test', etc.
  nodeEnv: process.env.NODE_ENV || 'development',

  // Secret key for JWT (JSON Web Token) signing.
  // This should be a long, random, and secret string.
  jwtSecret: process.env.JWT_SECRET,
};

// --- Optional: Validation ---
// You can add a check to ensure that all required environment variables are set.
// This will cause the application to fail fast if a critical configuration is missing.
const requiredVariables = ['DATABASE_URL', 'API_KEY', 'JWT_SECRET'];

const missingVariables = requiredVariables.filter(key => !process.env[key]);

if (missingVariables.length > 0) {
  // Use console.error for logging errors
  console.error(
    `Error: Missing required environment variables: ${missingVariables.join(', ')}`
  );
  // Exit the process with an error code
  process.exit(1);
}


// Export the config object so it can be imported and used in other files.
module.exports = config;

/*
--- How to Use ---

1.  Install dotenv:
    npm install dotenv

2.  Create a .env file in the root of your project directory.
    (This file should be added to your .gitignore to keep it private)

    Example .env file:

    # Application Configuration
    PORT=8080
    NODE_ENV=development

    # Database
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase

    # API Keys & Secrets
    API_KEY=your_secret_api_key_here
    JWT_SECRET=a_very_long_and_super_secret_string_for_jwt

3.  In your application's entry point (e.g., index.js or app.js),
    import the configuration:

    const config = require('./config');

    // Now you can access your configuration variables like this:
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    // Use config.databaseUrl to connect to your database.
    // Use config.apiKey for your API calls.

*/
