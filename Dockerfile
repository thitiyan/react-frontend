FROM nginx:alpine
RUN apk add bash ###Solution: Make use of apk add to install packages on Alpine.
RUN apk update && apk upgrade --no-cache
RUN apk add --update nodejs yarn

#RUN npm run build
# edit dockerfile
RUN mkdir /usr/share/nginx/html/ken
COPY . /usr/share/nginx/html/ken

WORKDIR /usr/share/nginx/html/ken
RUN yarn install 
CMD yarn start

#test