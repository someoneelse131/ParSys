# Stock Market Data Processing System

## Introduction
This project is designed to demonstrate a robust application setup using Docker, which includes services such as RabbitMQ, MongoDB, and custom applications for publishing and consuming stock market data.

## Requirements

### For Windows
- **Docker Desktop for Windows**: Install Docker Desktop from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/). Ensure your system supports virtualization and that it's enabled.

### For Linux
- **Docker for Linux**: Depending on your distribution, Docker installation steps will vary. Refer to the official Docker documentation for [Linux](https://docs.docker.com/engine/install/). Install both Docker Engine and Docker Compose.

### For Mac
- **Docker Desktop for Mac**: Install Docker Desktop from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac/). Docker Desktop for Mac provides an easy-to-use interface and includes Docker Engine, Docker CLI client, Docker Compose, Docker Content Trust, Kubernetes, and Credential Helper.

## Configuration
Directly modify the Docker Compose file to set up necessary configurations:
- **RabbitMQ**:
  - `RABBITMQ_DEFAULT_USER`: stockmarket
  - `RABBITMQ_DEFAULT_PASS`: supersecret123
  - `RABBITMQ_URL`: amqp://stockmarket:supersecret123@rabbitmq:5672/
- **MongoDB**:
  - `MONGODB_URL`: mongodb://mongodb1:27017,mongodb2:27018,mongodb3:27019/?replicaSet=rs0

## Build and Run
Build and run the application using Docker Compose:
- `docker-compose up -d --build`
This command builds the Docker images if not already built and starts the services defined in your Docker Compose file.

## Usage

### Accessing Services
- **RabbitMQ Management Interface**:
  - Access RabbitMQ via the management interface at `http://localhost:15672`.
  - Login with the credentials:
    - **User**: stockmarket
    - **Password**: supersecret123
  - This interface allows you to manage queues, exchanges, and monitor the message broker's performance.
- **System Access**:
  - Access the system through `http://localhost`, where a load balancer manages traffic to the appropriate services. This setup simplifies interaction without needing to specify individual service ports.

### Managing Containers
- To stop all services:
  - `docker-compose down`
- To view logs for a specific service:
  - `docker logs [container_name]`

### Reporting Issues
Encounter issues? Please open an issue on GitHub with a detailed description, steps to reproduce, and any relevant logs.

## Contributing
Contributions are warmly welcomed. Fork the repository and submit a pull request with your changes. For significant modifications, please first open an issue to discuss your proposed changes.
