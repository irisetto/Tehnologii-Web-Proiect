CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    occupied_position VARCHAR(100),
    profile_picture BYTEA,
    is_admin BOOLEAN DEFAULT false,
    mode_preference VARCHAR(10) NOT NULL DEFAULT 'light',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

--select * from users;

CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  animal_class VARCHAR(100),
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
  animal_status VARCHAR(100),
  fun_fact1 TEXT,
  fun_fact2 TEXT,
  about_text TEXT
);


--select * from animals;

CREATE TABLE animal_images (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  image1 BYTEA,
  image2 BYTEA,
  image3 BYTEA
);
