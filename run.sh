#!/bin/sh

echo "Regenerate Application Configuration"

#Handle static Keycloak host file
INDEX_FILE=$(ls ./build/index.html)
echo $INDEX_FILE
envsub --syntax handlebars $INDEX_FILE $INDEX_FILE

#Handle nginx default config
NGINX_CONF_FILE=$(ls /etc/nginx/conf.d/default.conf)
echo $NGINX_CONF_FILE
envsub --syntax handlebars $NGINX_CONF_FILE $NGINX_CONF_FILE

#Handle React static HTMLs
STATIC_FILES=$(ls ./build/static/js/*.chunk.js|awk -F / '{print $5}')

for FILE in $STATIC_FILES
do
    # echo $FILE
    STATIC_ARTIFACT=./build/static/js/$FILE
    echo $STATIC_ARTIFACT
    envsub --syntax handlebars $STATIC_ARTIFACT $STATIC_ARTIFACT
done 

echo "Run application"
nginx -t
nginx -g "daemon off;"

echo "Webapp started"
