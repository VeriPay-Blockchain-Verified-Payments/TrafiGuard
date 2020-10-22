module.exports = {
  apps : [{
    name: "TrafiGuard - Tradeora",
    script: "node index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
