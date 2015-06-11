FROM tatsushid/tinycore:6.3-x86_64

# Instructions are run with 'tc' user

RUN tce-load -wic gnupg curl \
    && rm -rf /tmp/tce/optional/*

# verify gpg and sha256: http://nodejs.org/dist/v0.10.30/SHASUMS256.txt.asc
# gpg: aka "Timothy J Fontaine (Work) <tj.fontaine@joyent.com>"
# gpg: aka "Julien Gilli <jgilli@fastmail.fm>"
RUN sudo gpg2 --keyserver pool.sks-keyservers.net --recv-keys 7937DFD2AB06298B2293C3187D33FF9D0246406D 114F43EE0176B71C7BC219DD50A3051F888C628D

ENV NODE_VERSION 0.12.4
ENV NPM_VERSION 2.10.1

RUN sudo mkdir -p /usr/src/app \
    && sudo mkdir -p /usr/local/etc/nginx/sites-available \
    && sudo mkdir -p /usr/local/etc/nginx/sites-enabled 
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
COPY . /usr/src/app

RUN tce-load -wic coreutils nginx git \
        binutils \
        file \
    && cd /tmp \
    && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v${NODE_VERSION}-linux-x64.tar.gz" \
    && curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && sudo gpg2 --verify SHASUMS256.txt.asc \
    && grep " node-v${NODE_VERSION}-linux-x64.tar.gz" SHASUMS256.txt.asc | sha256sum -c - \
    && tar -xzf "node-v${NODE_VERSION}-linux-x64.tar.gz" \
    && rm -f "node-v${NODE_VERSION}-linux-x64.tar.gz" SHASUMS256.txt.asc \
    && cd "/tmp/node-v${NODE_VERSION}-linux-x64" \
    && for F in `find . | xargs file | grep "executable" | grep ELF | grep "not stripped" | cut -f 1 -d :`; do \
            [ -f $F ] && strip --strip-unneeded $F; \
        done \
    && sudo cp -R . /usr/local \
    && cd / \
    && sudo ln -s /lib /lib64 \
    && rm -rf "/tmp/node-v${NODE_VERSION}-linux-x64" \
    && cd /tmp/tce/optional \
    && for PKG in acl.tcz \
                libcap.tcz \
                coreutils.tcz \
                binutils.tcz \
                file.tcz; do \
            echo "Removing $PKG files"; \
            for F in `unsquashfs -l $PKG | grep squashfs-root | sed -e 's/squashfs-root//'`; do \
                [ -f $F -o -L $F ] && sudo rm -f $F; \
            done; \
            INSTALLED=$(echo -n $PKG | sed -e s/.tcz//); \
            sudo rm -f /usr/local/tce.installed/$INSTALLED; \
        done \
    && rm -rf /tmp/tce/optional/* \
    && sudo npm install -g npm@"$NPM_VERSION" \
    && sudo npm install -g gulp \
    && sudo npm install -g bower \
    && sudo npm cache clear \
    && cd /usr/src/app \
    && ls \
    && sudo npm install \
    && sudo bower install --allow-root --config.interactive=false \
    && sudo gulp \
    && sudo mv /usr/src/app/target /usr/src && \
    sudo rm -rf /usr/src/app/* && \
    sudo mv /usr/src/target /usr/src/app && \
    sudo rm -rf /usr/local/lib/node_modules \
    && sudo rm -rf /tmp/* \
    && sudo rm -rf /usr/local/lib/git-core \
    && sudo rm -rf /root/.npm

USER root
RUN sudo su

ADD nginx.conf /usr/local/etc/nginx/nginx.conf

COPY config/default /usr/local/etc/nginx/sites-available/default

RUN ln -s /usr/local/etc/nginx/sites-available/default /usr/local/etc/nginx/sites-enabled/

EXPOSE 80

CMD ["nginx"]
