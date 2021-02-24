FROM craigmiller160.ddns.net:30004/nginx-base:1.1.0

COPY build/financial-manager-ui-*.tgz /var/www/financial-manager-ui.tgz
RUN tar xvf /var/www/financial-manager-ui.tgz -C /var/www/
RUN rm /var/www/financial-manager-ui.tgz
RUN cp -R /var/www/package/build/* /var/www/
RUN rm -rf /var/www/package
RUN cp /var/www/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx","-g","daemon off;"]
