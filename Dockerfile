FROM node:lts

WORKDIR /node-store

# package.json copied first to avoid the unecessary execution of npm install
COPY package.json .

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "start"]