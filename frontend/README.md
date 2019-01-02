# How to run this app


1. cd frontend
2. npm i --save
3. npm run build
4. npm run dev
5. In new terminal tab: cd backend
6. npm i --save
7. npm run deploy
8. npm run dev

To use my database:
create variables.env file in root of backend directory
paste the following:

FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="https://eu1.prisma.sh/jack-gray/politicious/dev"
PRISMA_SECRET="prismasecret"
APP_SECRET="jwtsecret"
STRIPE_SECRET="stripesecret"
PORT=4444
