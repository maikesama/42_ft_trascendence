#!/bin/bash

npx prisma generate

npx prisma migrate dev --name Mig

# start prisma studio and open it in the browser and run the following command
# exec two commands in one line
# exec npx prisma studio && npm run start:dev
# exec two command in multithreed
npx prisma studio & npm run start:dev

# start the server

#npm run build

#node dist/main.js
