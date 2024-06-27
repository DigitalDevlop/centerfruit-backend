# Center Fresh Wheel Game Backend

This repository contains the backend for the Center Fresh Wheel game, built using Strapi and PostgreSQL.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [License](#license)

## Requirements
- [Node.js](https://nodejs.org/) (version 20.14.0)
- [npm](https://www.npmjs.com/) (version 6 or higher) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (version 16)
- [Strapi](https://strapi.io/) (version 4 or higher)

## Installation
1. **Clone the repository**
    ```bash
    git clone https://github.com/DigitalDevlop/centerfruit-backend.githttps://github.com/DigitalDevlop/centerfruit-backend.git
    cd center-fresh-wheel-backend
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Setup PostgreSQL database**
    - Ensure PostgreSQL is installed and running.
    - Create a new database for the project.

## Configuration
1. **Create an environment configuration file**
    ```bash
    cp .env.example .env
    ```

2. **Update `.env` file** with your database credentials and other configuration settings:
    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_NAME=your-database-name
    DATABASE_USERNAME=your-database-username
    DATABASE_PASSWORD=your-database-password
    ```

## Running the Project
1. **Start the Strapi server**
    ```bash
    npm run develop
    # or
    yarn develop
    ```

2. **Access the Strapi admin panel**
    - Open your browser and go to [http://localhost:1337/admin](http://localhost:1337/admin).

## Project Structure
- `api/` - Contains the API implementation.
- `config/` - Configuration files for the project.
- `extensions/` - Custom extensions for Strapi.
- `public/` - Publicly accessible files.
- `src/` - Main source code for the project.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

> **Note:** This is a private project. No contributions are accepted.
