# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:23 AS development

# 
COPY dist /dist
COPY server.js /server.js

ENV PORT=3000
EXPOSE 3000

CMD [ "node", "server.js" ]
