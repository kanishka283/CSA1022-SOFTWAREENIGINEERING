kubectl apply -f k8s/
kubectl get pods,svc
kubectl scale deployment backend --replicas=5
kubectl get pods
kubectl scale deployment backend --replicas=2
