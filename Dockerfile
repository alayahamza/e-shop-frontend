FROM node:12.2.0
COPY /dist /dist
RUN npm install -g @angular/cli@7.3.9 &&\
    npm install angular-http-server -g
# start app
CMD cd /dist/e-shop-frontend && angular-http-server -p 4200
