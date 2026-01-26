# Dev

1. Clonar el archivo .env.template a .env 
2. Configurar las variables de entorno
3. Ejecutar el comando
```npm install```
4. Levantar las bases de datos
```docker compose up -d```
5. Generar cliente Prisma
```npx prisma generate```
6. Aplicar migraciones a PostgreSQL (si la DB está vacía)
```npx prisma migrate dev --name init```
7. Arrancar la app en desarrollo
```npm run dev```