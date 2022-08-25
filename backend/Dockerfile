FROM node:16-slim

WORKDIR /usr/src/app

RUN apt update -y

RUN apt install -y --no-install-recommends libssl1.1

COPY package*.json ./

RUN npm install

COPY . .

# RUN npx prisma generate



# RUN npx prisma migrate dev --name mig

# RUN npm run build

CMD [ "bash", "setup.sh" ]