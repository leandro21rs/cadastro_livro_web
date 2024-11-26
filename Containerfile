FROM node:17.6.0 as build
#FROM rhel8/nodejs-16

RUN adduser node root

RUN mkdir /frontend && chown node:node /frontend

RUN mkdir ./node_modules && chown node:node ./node_modules

RUN chown -R node:node /usr/local

RUN chmod -R 777 /usr/local

WORKDIR /frontend

RUN mkdir .angular && chown node:node .angular

COPY --chown=node:node ./ .

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build:production

FROM nginx:latest

COPY --from=build /frontend/dist/frontend/ /usr/share/nginx/html/livro-web/

COPY --from=build /frontend/dist/frontend/ /etc/nginx/html/livro-web/

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200 80
