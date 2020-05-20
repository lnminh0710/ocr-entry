# => Build container
FROM tdungnguyen/jiapu-py-node-base:slim-2.7.17-1.15.2-build-001 as react_build_base

MAINTAINER DungNT tdung.nguyen2694@gmail.com

WORKDIR /app

COPY package.json .

COPY . .

RUN cd /app && \
    mv env.tmpl .env.production && \
    mkdir -p node_modules/node-sass/vendor/linux-x64-72/ && \
    wget -O node_modules/node-sass/vendor/linux-x64-72/binding.node https://github.com/sass/node-sass/releases/download/v4.13.0/linux-x64-72_binding.node  -v && \
    npm install --loglevel verbose

RUN npm run build --verbose

FROM tdungnguyen/jiapu-node-base:alpine-2.7.17-1.15.2-runtime-001

WORKDIR /app

COPY --from=react_build_base /app/build /app/build

COPY run.sh /app

# Nginx default config files
COPY nginx.conf /etc/nginx/nginx.conf
COPY static.conf /etc/nginx/conf.d/default.conf

RUN chmod +x run.sh && \
    mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

RUN nginx -t

CMD [ "./run.sh" ]
