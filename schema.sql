CREATE TABLE movieTable (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    date VARCHAR(255),
    path TEXT,
    overview TEXT,
    comment VARCHAR(255)
);