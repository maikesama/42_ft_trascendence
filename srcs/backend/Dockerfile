FROM node:18-alpine

WORKDIR /app

COPY ./ ./

RUN npm install

CMD [ "sh", "setup.sh" ]
# CMD [ "sh", "setup.prod.sh" ]
