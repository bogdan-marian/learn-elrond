# how to use this file

```bash
# we assumed you have not cloned the project yet
git clone https://github.com/bogdan-marian/learn-elrond.git
cd learn-elrond/docker-dev-env
docker build -t my-elrond-container .

docker run -it my-elrond-container bash

git clone https://github.com/bogdan-marian/learn-elrond.git
cd learn-elrond/my-contract/

#build the contract
erdpy contract build
. interaction/devnet.snippets.sh

# this one will return empty Smart contract address
deploy

```