FROM node:18

WORKDIR /app

COPY package*.json ./

ENV DATABASE_URL=postgresql://postgres:LuchshayaRabotaVMire@db.pujfkkjowunsqchvsttf.supabase.co:5432/postgres
ENV SESSION_SECRET=samayaluchshayakomanda

RUN npm install

COPY . . 

EXPOSE 4000

CMD ["node", "app.js"]