# NLP Backend

## Prerequisites

1.  Docker 19.03.0+

### How to run?

- Clone the repository;
- Open cloned directory;
- Create your own `.env` (you can find an example inside `.env.sample`);
- Run `docker compose up -d` to start the application in a development environment and detached mode. The server starts on port 3001;
- Run `docker compose -f compose.yml -f compose.prod.yml up -d` to start the application in a production environment and detached mode. The server starts on port 3000.

## Objective

The primary objective of this project is to utilize Natural Language Processing (NLP) techniques to design and deploy a solution for generating metadata for articles that are widely recognized by a large audience.

## Key Components and Workflow

### 1. Data Retrieval and Processing

- **Data Sources**: The data comes from three main places: DOU, Techcrunch, and mc.today.
- **Data Parsing Strategy**: A specific way to read each source's data helps get the right details from the sources.
- **Data Processing**: The data is being processed by the GPT-3.5-turbo model and metadata is being obtained.

### 2. Endpoints

- GET `/posts` to get all the posts.
- GET `/posts/search` to search posts, accepts following query parameters: query, count (optional, default = 10)
- GET `/tags/search` to search tags, accepts following query parameters: query, count (optional, default = 10)
- GET `/tags/popular` to retrive the most popular tags, accepts following query parameters: count (optional, default = 10)

- GET `/data/dou` to parse the data from particular source, accepts following query parameters: page (optional, default = 1)
- GET `/data/techcrunch` to parse the data from particular source, accepts following query parameters: page (optional, default = 1)
- GET `/tags/mctoday` to parse the data from particular source, accepts following query parameters: page (optional, default = 1)
