all: ip up

del:
	@sed -ie '/REACT_APP_HOST_URI/d' .env
	@rm .enve

ip: del
	@echo "REACT_APP_HOST_URI=$(shell ipconfig getifaddr en0)" >> .env

up :
	docker-compose up --build

localhost:
	@echo "REACT_APP_HOST_URI=localhost" >> .env
	docker-compose up --build

down:
	docker-compose down

clean:
	docker-compose down --rmi all

fclean: clean
	docker-compose down --volumes
	docker system prune -af

make re: fclean all
