Run postgres docker image:

```
docker run -d 
-e POSTGRES_DB=movieDB \
-e POSTGRES_USER=johndoe \
-e POSTGRES_PASSWORD=123456 \
-p 5434:5432 postgres
```
