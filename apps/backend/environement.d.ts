declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_URL: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_AUTH_USER: string;
      SMTP_AUTH_PASS: string;
      SALT_ROUNDS: string;
      PASSWORD_FORGOTTEN_SECRET_KEY: string;
      EMAIL_VALIDATION_SECRET_KEY: string;
      INVITATION_SECRET_KEY: string;
      TOKEN_PASSWORD_FORGOTTEN_EXPIRATION: string;
      COOKIE_AUTH_NAME: string;
      COOKIE_AUTH_EXPIRATION: string;
      AUTH_SECRET_KEY: string;
      COOKIE_REFRESH_NAME: string;
      COOKIE_REFRESH_EXPIRATION: string;
      REFRESH_SECRET_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
