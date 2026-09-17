CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,

    slug VARCHAR(32) NOT NULL UNIQUE,

    original_url TEXT NOT NULL,

    expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX idx_urls_user_id
ON urls(user_id);


CREATE INDEX idx_urls_expires_at
ON urls(expires_at);
