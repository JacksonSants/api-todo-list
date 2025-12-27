FROM node:20-alpine AS builder

# Instala bibliotecas necessárias para o Prisma no Alpine
RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./
# O 'ci' é excelente para builds limpos
RUN npm ci

# Copia os arquivos do Prisma antes do código para aproveitar o cache
COPY prisma ./prisma/
# Gera o client ANTES do build para o TS reconhecer os tipos
RUN npx prisma generate

COPY . .
RUN npm run build
# Remove dependências de dev, mas mantém o necessário para produção
RUN npm prune --production

FROM node:20-alpine AS runner

# O Runner também precisa do openssl para conectar no RDS
RUN apk add --no-cache openssl

WORKDIR /app
ENV NODE_ENV=production

# Copia o essencial do estágio de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# Garante que o usuário 'node' tem permissão na pasta (importante no Alpine)
RUN chown -R node:node /app

USER node
EXPOSE 3000

CMD ["npm", "start"]