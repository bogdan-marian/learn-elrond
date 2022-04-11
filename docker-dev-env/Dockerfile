FROM ubuntu:20.04
# https://hub.docker.com/r/adoptopenjdk/openjdk11/ 
# https://github.com/AdoptOpenJDK/openjdk-docker/blob/master/11/jdk/ubuntu/Dockerfile.hotspot.releases.full
ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'
RUN apt-get update
RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl sudo gcc gcc-multilib mono-mcs\
       git libncurses5 wget ca-certificates fontconfig locales python3 python3-pip python3-venv\
    && echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
    && locale-gen en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_VERSION jdk-11.0.11+9

RUN set -eux; \
    ARCH="$(dpkg --print-architecture)"; \
    case "${ARCH}" in \
       aarch64|arm64) \
         ESUM='4966b0df9406b7041e14316e04c9579806832fafa02c5d3bd1842163b7f2353a'; \
         BINARY_URL='https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_aarch64_linux_hotspot_11.0.11_9.tar.gz'; \
         ;; \
       armhf|armv7l) \
         ESUM='2d7aba0b9ea287145ad437d4b3035fc84f7508e78c6fec99be4ff59fe1b6fc0d'; \
         BINARY_URL='https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_arm_linux_hotspot_11.0.11_9.tar.gz'; \
         ;; \
       ppc64el|ppc64le) \
         ESUM='945b114bd0a617d742653ac1ae89d35384bf89389046a44681109cf8e4f4af91'; \
         BINARY_URL='https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_ppc64le_linux_hotspot_11.0.11_9.tar.gz'; \
         ;; \
       s390x) \
         ESUM='5d81979d27d9d8b3ed5bca1a91fc899cbbfb3d907f445ee7329628105e92f52c'; \
         BINARY_URL='https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_s390x_linux_hotspot_11.0.11_9.tar.gz'; \
         ;; \
       amd64|x86_64) \
         ESUM='e99b98f851541202ab64401594901e583b764e368814320eba442095251e78cb'; \
         BINARY_URL='https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_x64_linux_hotspot_11.0.11_9.tar.gz'; \
         ;; \
       *) \
         echo "Unsupported arch: ${ARCH}"; \
         exit 1; \
         ;; \
    esac; \
    curl -LfsSo /tmp/openjdk.tar.gz ${BINARY_URL}; \
    echo "${ESUM} */tmp/openjdk.tar.gz" | sha256sum -c -; \
    mkdir -p /opt/java/openjdk; \
    cd /opt/java/openjdk; \
    tar -xf /tmp/openjdk.tar.gz --strip-components=1; \
    rm -rf /tmp/openjdk.tar.gz;

ENV JAVA_HOME=/opt/java/openjdk \
    PATH="/opt/java/openjdk/bin:$PATH"
# CMD ["jshell"]
#####################################################################


# Create ubuntu user with sudo privileges
RUN useradd -ms /bin/bash ubuntu && \
    usermod -aG sudo ubuntu
# New added for disable sudo password
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Set as default user
USER ubuntu
WORKDIR /home/ubuntu

RUN python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"
ENV JAVA_HOME=/opt/java/openjdk \
    PATH="/opt/java/openjdk/bin:$HOME/.local/bin:$HOME/Library/Python/3.8/bin:$PATH"

# rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

RUN wget -O erdpy-up.py https://raw.githubusercontent.com/ElrondNetwork/elrond-sdk-erdpy/master/erdpy-up.py
RUN python3 erdpy-up.py

RUN wget -c https://dl.google.com/go/go1.15.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
RUN mkdir -p /home/ubuntu/elrondsdk/awentools/v1.1.2
RUN wget -c https://github.com/ElrondNetwork/arwen-wasm-vm/archive/v1.1.2.tar.gz -O - | sudo tar -xz -C /home/ubuntu/elrondsdk/awentools/v1.1.2

RUN . /home/ubuntu/.profile
ENV PATH="/home/ubuntu/elrondsdk:$PATH"

# set working dir

RUN sudo chown -R ubuntu /home/ubuntu/*

WORKDIR /home/ubuntu

ENV TEST_ENV="variable-defined-by-docker-file-ubuntu"
ENV PROJECT="/home/ubuntu/mycontract"
