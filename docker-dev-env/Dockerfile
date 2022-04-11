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


# Create ubuntu user with sudo privileges
RUN useradd -ms /bin/bash ubuntu && \
    usermod -aG sudo ubuntu
# New added for disable sudo password
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Set as default user
USER ubuntu
WORKDIR /home/ubuntu

RUN python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')"

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
