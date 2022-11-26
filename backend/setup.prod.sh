
npx prisma generate &> /dev/null

npx prisma migrate dev --name Mig &> /dev/null

npm run build

node dist/main.js