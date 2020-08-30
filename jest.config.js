process.env.LOG_LEVEL = process.env.LOG_LEVEL || "off";

module.exports = {
  roots: [
    "<rootDir>/test",
  ],
  testMatch: ["**/*.(test|spec).(j|t)s"],
  testEnvironment: "node"
};
