FROM craigmiller160-nginx-base:1.1.0

RUN apt-get update && apt-get install unzip

COPY build/financial-manager-ui-*.zip /var/www/financial-manager-ui.zip
RUN unzip /var/www/financial-manager-ui.zip -d /var/www/
RUN rm /var/www/financial-manager-ui.zip
RUN cp /var/www/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]
