CREATE TABLE IF NOT EXISTS tickets (
 id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL CHECK (LENGTH(name) >= 3),
    email VARCHAR(255) NOT NULL CHECK (LENGTH(email) >= 5),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in progress', 'resolved')),
    subject VARCHAR(255) NOT NULL CHECK (LENGTH(subject) >= 3),
    description TEXT NOT NULL CHECK (LENGTH(description) >= 5),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);