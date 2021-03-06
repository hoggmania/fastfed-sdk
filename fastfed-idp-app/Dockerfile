FROM node:10.16.3 as base

# docker build --no-cache -t fastfed-idp-app .

# windows
# docker run --rm --volumes-from fastfed-node-sdk -v %cd%:/source/fastfed-idp-app --name fastfed-idp-app -it fastfed-idp-app

# linux
# docker run --rm --volumes-from fastfed-node-sdk -v $(pwd):/source/fastfed-idp-app --name fastfed-idp-app -it fastfed-idp-app

FROM fastfed-node-sdk as sdk

FROM base

ARG SOURCE_DIR=/source/fastfed-idp-app
RUN mkdir -p ${SOURCE_DIR} && chown node:node ${SOURCE_DIR}

RUN npm install -g npm-run-all

USER node

COPY ./wait-for-it.sh /

WORKDIR ${SOURCE_DIR}

RUN mkdir -p ./server
RUN mkdir -p ./client

COPY ./package.* ./
COPY ./server/package.* ./server/
COPY ./client/package.* ./client/

COPY --from=sdk /source/fastfed-node-sdk/package.* /source/fastfed-node-sdk/dist/

RUN npm run docker-init

USER root

RUN cd ${SOURCE_DIR}/server && \
	npm link /source/fastfed-node-sdk/dist && \
	chmod +x /wait-for-it.sh

EXPOSE 8012
EXPOSE 9229

# https://stackoverflow.com/questions/44176922/docker-container-doesnt-reload-angular-app
# for Angular live reload
EXPOSE 49153

CMD ["/wait-for-it.sh", "keycloak:8080", "-t", "60", "--", "npm", "run", "start"]

