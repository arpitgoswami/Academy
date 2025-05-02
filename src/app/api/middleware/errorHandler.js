const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});

// Centralized error-handling middleware
const errorHandler = (error, req) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
  });

  return new Response(
    JSON.stringify({
      error: "An unexpected error occurred. Please try again later.",
    }),
    { status: 500 }
  );
};

module.exports = errorHandler;
