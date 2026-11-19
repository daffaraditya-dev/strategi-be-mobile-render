run:
	docker rm -f strategi-mobile-be || true
	docker build --no-cache -t strategi-mobile-be .
	docker run -p 3003:3003 --name strategi-mobile-be -d strategi-mobile-be
	docker logs strategi-mobile-be -f

logs:
	docker logs strategi-mobile-be -f