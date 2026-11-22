docker build -t <dockerhub-username>/flask-api:1.0 .
docker run -p 5000:5000 <dockerhub-username>/flask-api:1.0
docker login
docker push <dockerhub-username>/flask-api:1.0
kubectl apply -f k8s/
kubectl get pods,svc
minikube service flask-api-svc --url
