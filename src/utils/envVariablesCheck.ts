const requiredEnvVars = [
  "PORT",
  "BASE_API_URL",
  "CRON_SCHEDULE",
  "MONGODB_URI",
  "IPINFO_API_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "RECIPIENT_EMAIL",
];

function checkEnvironmentVariables() {
  let varNotSet = 0;
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`ERROR:${envVar} is not set`);
      varNotSet += 1;
    }
  });
  if (varNotSet > 0) {
    console.error(
      `[  ${varNotSet}/${requiredEnvVars.length} variables are not set  ]`
    );
  }
}

export default checkEnvironmentVariables;
