-- migrations/001_initial_schema.sql

-- First, ensure extensions are created
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
DO $$ BEGIN
    CREATE TYPE card_element AS ENUM ('fire', 'water', 'earth', 'wind', 'holy', 'dark', 'none');
    CREATE TYPE card_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');
    CREATE TYPE currency_type AS ENUM ('souls', 'ember_shards');
    CREATE TYPE cosmetic_type AS ENUM ('card_back', 'board_theme', 'avatar_frame', 'effect');
    CREATE TYPE match_status AS ENUM ('pending', 'active', 'completed', 'abandoned');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update existing players table with new columns and constraints
ALTER TABLE players
ADD COLUMN IF NOT EXISTS auth_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS rank INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS souls INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ember_shards INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS win_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS loss_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS win_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS highest_win_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS active_avatar_frame UUID,
ADD COLUMN IF NOT EXISTS active_card_back UUID,
ADD COLUMN IF NOT EXISTS active_board_theme UUID,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add constraints if they don't exist
DO $$ BEGIN
    ALTER TABLE players
    ADD CONSTRAINT positive_currencies
    CHECK (souls >= 0 AND ember_shards >= 0);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    values JSONB NOT NULL,
    element card_element DEFAULT 'none',
    rarity card_rarity NOT NULL,
    power_rating INTEGER NOT NULL,
    set_id VARCHAR(50) NOT NULL,
    set_name VARCHAR(100) NOT NULL,
    image_url TEXT,
    animation_url TEXT,
    is_active BOOLEAN DEFAULT true,
    release_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_power_rating CHECK (power_rating >= 0)
);

-- Create player_cards table
CREATE TABLE IF NOT EXISTS player_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    card_id UUID NOT NULL REFERENCES cards(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    is_favorite BOOLEAN DEFAULT false,
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    custom_skin_id UUID,
    UNIQUE (player_id, card_id),
    CONSTRAINT positive_quantity CHECK (quantity > 0)
);

-- Create decks table
CREATE TABLE IF NOT EXISTS decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cover_card_id UUID REFERENCES cards(id),
    is_active BOOLEAN DEFAULT true,
    total_power INTEGER NOT NULL DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_stats CHECK (wins >= 0 AND losses >= 0)
);

-- Create deck_cards table
CREATE TABLE IF NOT EXISTS deck_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    card_id UUID NOT NULL REFERENCES cards(id),
    position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (deck_id, card_id),
    CONSTRAINT valid_position CHECK (position >= 0 AND position < 8)
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player1_id UUID NOT NULL REFERENCES players(id),
    player2_id UUID NOT NULL REFERENCES players(id),
    player1_deck_id UUID NOT NULL REFERENCES decks(id),
    player2_deck_id UUID NOT NULL REFERENCES decks(id),
    winner_id UUID REFERENCES players(id),
    status match_status NOT NULL DEFAULT 'pending',
    game_state JSONB NOT NULL DEFAULT '{}'::jsonb,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT different_players CHECK (player1_id != player2_id)
);

-- Add necessary indexes
CREATE INDEX IF NOT EXISTS idx_player_cards_player_id ON player_cards(player_id);
CREATE INDEX IF NOT EXISTS idx_deck_cards_deck_id ON deck_cards(deck_id);
CREATE INDEX IF NOT EXISTS idx_matches_player_ids ON matches(player1_id, player2_id);
CREATE INDEX IF NOT EXISTS idx_cards_element_rarity ON cards(element, rarity);
CREATE INDEX IF NOT EXISTS idx_player_cards_favorite ON player_cards(player_id) WHERE is_favorite = true;
CREATE INDEX IF NOT EXISTS idx_active_matches ON matches(status) WHERE status = 'active';

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to relevant tables
DO $$ BEGIN
    CREATE TRIGGER update_player_modtime
        BEFORE UPDATE ON players
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_deck_modtime
        BEFORE UPDATE ON decks
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
