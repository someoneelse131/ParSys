# Set the base image to the official Golang image
FROM golang:1.22.2-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application
RUN go build -o stock-publisher

# Create a new stage for a smaller final image
FROM alpine:latest

# Set the working directory inside the container
#WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/stock-publisher .

# Set environment variables
ENV RABBITMQ_URL amqp://stockmarket:supersecret123@localhost:5672/
ENV TICKER_INTERVAL 1

# Command to run the application
CMD ["./stock-publisher"]