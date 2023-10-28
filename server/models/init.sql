CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in progress', 'resolved')),
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);