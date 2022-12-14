# FROM node:alpine
# WORKDIR /usr/app/front
# EXPOSE 3000
# COPY ./ ./
# RUN npm install
# CMD ["npm", "start"]


FROM --platform=linux/amd64 node:alpine
WORKDIR /app/front
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]