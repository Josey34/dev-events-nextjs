# Docker Setup Guide

This project includes Docker configurations for both development and production environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

## Development Environment

### Quick Start

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Update your `.env` file with your actual credentials:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri_or_any_mongodb_connection_string
   CLOUDINARY_URL=your_cloudinary_url
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

2. **Start the development environment:**
   ```bash
   docker-compose up
   ```

   Or run in detached mode:
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Next.js app: http://localhost:3000

### Development Commands

- **Stop all services:**
  ```bash
  docker-compose down
  ```

- **Stop and remove volumes (clean database):**
  ```bash
  docker-compose down -v
  ```

- **Rebuild containers:**
  ```bash
  docker-compose up --build
  ```

- **View logs:**
  ```bash
  docker-compose logs -f
  ```

- **View logs for specific service:**
  ```bash
  docker-compose logs -f nextjs-dev
  ```

- **Execute commands inside the container:**
  ```bash
  docker-compose exec nextjs-dev npm install <package-name>
  ```

### Hot Reload

The development setup includes volume mounting, so changes to your code will automatically trigger hot reload without needing to rebuild the container.

## Production Environment

### Quick Start

1. **Set up environment variables:**

   Update your `.env` file with production values:
   ```env
   MONGODB_URI=your_production_mongodb_uri
   CLOUDINARY_URL=your_cloudinary_url
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   SENTRY_AUTH_TOKEN=your_sentry_auth_token
   ```

2. **Build and start production containers:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

3. **Access the application:**
   - Next.js app: http://localhost:3000

### Production Commands

- **Stop production services:**
  ```bash
  docker-compose -f docker-compose.prod.yml down
  ```

- **View production logs:**
  ```bash
  docker-compose -f docker-compose.prod.yml logs -f
  ```

- **Rebuild production image:**
  ```bash
  docker-compose -f docker-compose.prod.yml up -d --build
  ```

## Building Individual Docker Images

### Development Image

```bash
docker build -f Dockerfile.dev -t dev-events-nextjs:dev .
docker run -p 3000:3000 --env-file .env dev-events-nextjs:dev
```

### Production Image

```bash
docker build -t dev-events-nextjs:prod .
docker run -p 3000:3000 --env-file .env dev-events-nextjs:prod
```

## Troubleshooting

### Container won't start

Check logs:
```bash
docker-compose logs nextjs-dev
```

### Database connection issues

Verify your MONGODB_URI environment variable is correct:
```bash
docker-compose exec nextjs-dev printenv MONGODB_URI
```

Check if you can connect to MongoDB Atlas (or your MongoDB instance) from the container.

### Port already in use

If port 3000 is already in use, modify the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Changed from 3000:3000
```

### Clear everything and start fresh

```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Performance Tips

### For Windows/Mac Users

Docker performance on Windows and Mac can be improved by:

1. Allocating more resources to Docker Desktop (Settings → Resources)
2. Using named volumes instead of bind mounts for `node_modules`
3. Enabling WSL2 backend (Windows only)

### Production Optimization

The production Dockerfile uses multi-stage builds to:
- Minimize image size
- Exclude development dependencies
- Use Next.js standalone output for faster startup

## Network Architecture

### Development
- **dev-network**: Bridge network for the Next.js container
- Connects to external MongoDB (MongoDB Atlas or other)

### Production
- **prod-network**: Bridge network for the Next.js container
- Connects to external MongoDB (MongoDB Atlas or other)
- Optional Nginx reverse proxy for SSL termination (commented out by default)

## Database Setup

This Docker configuration is designed to work with **MongoDB Atlas** (or any external MongoDB instance).

If you want to use a **local MongoDB container** instead:

1. Add this to your `docker-compose.yml`:
   ```yaml
   mongodb:
     image: mongo:7-jammy
     container_name: dev-events-mongodb
     restart: unless-stopped
     ports:
       - "27017:27017"
     environment:
       - MONGO_INITDB_ROOT_USERNAME=admin
       - MONGO_INITDB_ROOT_PASSWORD=password
     volumes:
       - mongodb_data:/data/db
     networks:
       - dev-network

   volumes:
     mongodb_data:
       driver: local
   ```

2. Update your MONGODB_URI:
   ```env
   MONGODB_URI=mongodb://admin:password@mongodb:27017/devevents?authSource=admin
   ```

## Security Considerations

1. **Never commit `.env` files** - They're in `.gitignore` for a reason
2. **Use secure MongoDB credentials** - Change default passwords
3. **Use secrets management** - Consider Docker secrets or environment-specific vaults for production
4. **Enable SSL** - Configure proper SSL certificates for production deployments

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
