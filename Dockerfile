FROM node:lts

WORKDIR /node-store

# package.json copied first to avoid the unecessary execution of npm install
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]