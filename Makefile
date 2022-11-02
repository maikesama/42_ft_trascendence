all:
	docker-compose up --build

down:
	docker-compose down

clean:
	docker-compose down --rmi all

fclean: clean
	docker-compose down --volumes
	docker system prune -af

make re: fclean all