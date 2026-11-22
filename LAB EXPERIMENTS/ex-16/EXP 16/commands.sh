docker build -t static-site .
docker run -d -p 8080:80 --name site static-site
docker ps
# open http://localhost:8080
