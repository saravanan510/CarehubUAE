module.exports = {
  apps: [
    {
      name: "CarehubUAE",
      script: ".next/standalone/Frontend/server.js",
      cwd: "/var/www/CarehubUAE/Frontend",
      env: {
        PORT: 3001,
        NODE_ENV: "production"
      }
    }
  ]
};
