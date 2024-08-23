# rplan

```bash
docker build --pull -t rplan-backend -f ./packages/backend/Dockerfile .
docker run -d --name rplan-backend -p 4000:4000 rplan-backend
```

```bash
docker build --pull -t rplan-frontend -f ./packages/frontend/Dockerfile .
docker run -d --name rplan-frontend -p 3000:3000 rplan-frontend
```
