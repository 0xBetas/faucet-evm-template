FROM node:20.12.0-alpine3.19
COPY . .
RUN npm i

CMD npm run build && npm run start