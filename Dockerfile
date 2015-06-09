FROM node:0.12.4-onbuild
# replace this with your application's default port

RUN apt-get update && apt-get -y install nginx

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ADD default /etc/nginx/sites-available/default
RUN ln -fs /etc/nginx/sites-available/default /etc/nginx/sites-enabled

WORKDIR /usr/src/app

RUN npm install -g bower
RUN bower install --allow-root --config.interactive=false
RUN npm install -g gulp
RUN gulp
RUN chown www-data:www-data /usr/src/app/target

#
EXPOSE 80

CMD ["nginx"]
