#!/bin/bash

npx prisma generate

npx prisma migrate dev --name Mig

#npm run build

npm run start:dev

#node dist/main.js