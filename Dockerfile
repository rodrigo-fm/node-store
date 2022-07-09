FROM node:lts

WORKDIR /node-store

# package.json copied first to avoid the unecessary execution of npm install
COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=3000

ENV PORT=$DEFAULT_PORT

EXPOSE $PORT

CMD ["npm", "start"]