# polyomino-express


## hit and blow

```
curl -X POST -H "Content-Type:application/json" -d '{"questions":[{"number":"012", "result":{"hit":0,"blow":3}}]}' localhost:8080/hit-and-blow/3
["120","201"]

curl -X POST -H "Content-Type:application/json" -d '{"questions":[{"number":"012", "result":{"hit":0,"blow":3}},{"number":"120", "result":{"hit":0,"blow":3}}]}' localhost:8080/hit-and-blow/3
["201"]
```
