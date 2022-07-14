# Remember: the order of the commands can impact the image build performance
# if the ARG instruction, for instance, were declared before WORKDIR
# everything below it would re-run when the option --build-arg DEFAULT_PORT=[value] were added to the docker build command,
# since it changes the value of the DEFAULT_PORT arg.

# The tip now might be: keep the most dynamic commands at the bottom and the most static ones at the top
FROM node:16

WORKDIR /node-store

# package.json copied first to avoid the unecessary execution of npm install
COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=3000

ENV PORT=$DEFAULT_PORT

EXPOSE $PORT