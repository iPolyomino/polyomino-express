# polyomino-express


## hit and blow

```
curl -X POST -H "Content-Type:application/json" -d '{"questions":[{"number":"012", "result":{"hit":0,"blow":3}}]}' localhost:8080/hit-and-blow
["120","201"]

curl -X POST -H "Content-Type:application/json" -d '{"questions":[{"number":"012", "result":{"hit":0,"blow":3}},{"number":"120", "result":{"hit":0,"blow":3}}]}' localhost:8080/hit-and-blow
["201"]
```


```
curl -X POST -H "Content-Type:application/json" -d '{"next":"234","questions":[{"number":"012", "result":{"hit":0,"blow":1}}]}' localhost:8080/hit-and-blow/next
{"0hit0blow":80,"0hit1blow":75,"0hit2blow":19,"0hit3blow":1,"1hit0blow":45,"1hit1blow":18,"1hit2blow":2,"2hit0blow":11,"2hit1blow":0,"3hit0blow":1}
```
