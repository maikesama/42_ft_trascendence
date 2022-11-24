#!/bin/bash

# npx prisma generate

# npx prisma migrate dev --name Mig

# npx prisma studio & npm run start:dev


npx prisma generate

npx prisma migrate dev --name Mig

npm run build

node dist/main.js