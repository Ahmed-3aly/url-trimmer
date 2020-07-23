
Simple 'URL TRIMMER' application.

backend stacks:
	* C#, ASP.NET Code, SQL, nunit
	* TypeScript, node, express, mongoDB, jest

frontend stacks:
	* TypeScript, Vue, Mobx, jest
	* TypeScript, React, Mobx, jest

docker images used:
	* node:14.5 (customized as per the docker-npm-builder)
		used as build agend
	* node:14.5-slim (customized as per the docker-npm-builder)
		used as express api host
	* nginx:stable-alpine
		used as frontend static files host

================
API
 > cd react

to jest:
 > npm test

to develop:
 > npm run dev

to compose:
 > docker-compose -f compose-api.yml build

swagger link:
 - navigate to localhost:5000/swagger

================
React
 > cd react

to develop:
 > npm start

to compose:
 > docker-compose -f compose-react.yml build

================
VUE
 > cd vue

to develop:
 > npm run serve

to compose:
 > docker-compose -f compose-vue.yml build
