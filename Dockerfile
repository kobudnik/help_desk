FROM node:latest
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY ./dist ./dist
EXPOSE 3000
CMD ["npm", "start"]