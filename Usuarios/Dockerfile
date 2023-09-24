FROM openjdk:latest

WORKDIR /app

COPY ./target/users-0.0.1-SNAPSHOT.jar .

COPY ./wait-for-it.sh .

RUN chmod +x ./wait-for-it.sh


CMD ["./wait-for-it.sh", "mysql:3306", "redis:6379","--", "java", "-jar", "users-0.0.1-SNAPSHOT.jar"]