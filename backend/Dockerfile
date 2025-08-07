# Use an official OpenJDK image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the build context to the image
COPY target/*.jar app.jar

# Expose the port Spring Boot will run on (default 8080)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
