### Launch application

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:4000

### posgresql

```sh
# download image docker
docker pull postgres
# create instance
docker run --name rplan-postgres -e POSTGRES_USER=rplan -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
# connect to pg
PGPASSWORD=mysecretpassword psql -U rplan -p 5432 -h  127.0.0.1
# create
CREATE DATABASE rplan;
# exit postgresql
cp .env.exemple .env
# alter .env DATABASE_URL with your config
npx prisma db push
```