// tiny wrapper with default env vars
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  LINKEDIN_CLIENT_ID: 'test ID',
  LINKEDIN_CLIENT_SECRET: 'test secret',
};
