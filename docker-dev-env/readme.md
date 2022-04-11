# how to use this file

```bash
# we assumed you have not cloned the project yet
git clone https://github.com/bogdan-marian/learn-elrond.git
cd learn-elrond/docker-dev-env
docker build -t my-elrond-container .

# at the moment this will not get build because of errors but next step should be
docker run -it my-elrond-container bash
# happy coding
```