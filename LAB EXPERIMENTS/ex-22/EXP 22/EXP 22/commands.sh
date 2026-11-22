docker login
docker pull hello-world
docker tag hello-world <dockerhub-username>/hello-world:v1
docker push <dockerhub-username>/hello-world:v1
docker rmi <dockerhub-username>/hello-world:v1
docker pull <dockerhub-username>/hello-world:v1
docker run <dockerhub-username>/hello-world:v1
