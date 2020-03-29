FROM cypress/included:4.2.0

WORKDIR /app

ENTRYPOINT ["node", "/app/index.js"]
