npx prisma migrate dev --name firstMig

npm run prebuild
npm run build
cp package.json ./dist
cp -rf prisma ./dist
cp .env ./dist
cd dist
npm install
cd ..
node dist/main.js