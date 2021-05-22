export PROJECT_ID=my-sand-box
cd e02-crowdfunding-api
./gradlew build
cd ..
docker build -t gcr.io/${PROJECT_ID}/crowdfunding:v1 .
docker run -p 8080:8080 gcr.io/${PROJECT_ID}/crowdfunding:v1
