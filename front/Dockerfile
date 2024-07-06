FROM node:17-alpine
WORKDIR /front
COPY package.json .
RUN npm install
COPY . /front
EXPOSE 3000
CMD ["npm", "start"]