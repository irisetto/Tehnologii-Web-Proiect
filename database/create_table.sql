CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    occupied_position VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

--select * from users;

CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  class VARCHAR(100),
  common_name VARCHAR(100),
  scientific_name VARCHAR(100),
  habitat VARCHAR(100),
  lifestyle VARCHAR(100),
  diet VARCHAR(100),
  weight FLOAT,
  height FLOAT,
  region VARCHAR(100),
  lifespan INTEGER,
  skin_type VARCHAR(100),
  about_text TEXT
);

--select * from animals;
