/* eslint-disable */
/* THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import { a } from "@aws-amplify/data-schema";
import { configure } from "@aws-amplify/data-schema/internals";
import { secret } from "@aws-amplify/backend";

export const schema = configure({
    database: {
        identifier: "IDNKF4Qght46DM7GRIyMUSnw",
        engine: "postgresql",
        connectionUri: secret("SQL_CONNECTION_STRING"),
        vpcConfig: {
            vpcId: "vpc-091080ed6c0fc28f9",
            securityGroupIds: [
                "sg-036076ab76c787e36",
                "sg-0805851ecf3172563"
            ],
            subnetAvailabilityZones: [
                {
                    subnetId: "subnet-0d34531e6a68c4e72",
                    availabilityZone: "us-east-2c"
                },
                {
                    subnetId: "subnet-00bb5b86c398a9096",
                    availabilityZone: "us-east-2b"
                },
                {
                    subnetId: "subnet-09ef6bd42a4b1cf78",
                    availabilityZone: "us-east-2a"
                }
            ]
        }
    }
}).schema({
    "cards": a.model({
        id: a.id().required(),
        name: a.string().required(),
        description: a.string(),
        values: a.json().required(),
        element: a.ref("CardsElement"),
        rarity: a.ref("CardsRarity").required(),
        power_rating: a.integer().required(),
        set_id: a.string().required(),
        set_name: a.string().required(),
        image_url: a.string(),
        animation_url: a.string(),
        is_active: a.boolean(),
        release_date: a.string(),
        created_at: a.string(),
        tier: a.integer()
    }).identifier([
        "id"
    ]),
    "deck_cards": a.model({
        id: a.id().required(),
        deck_id: a.id().required(),
        card_id: a.id().required(),
        position: a.integer(),
        created_at: a.string()
    }).identifier([
        "id"
    ]),
    "decks": a.model({
        id: a.id().required(),
        player_id: a.id().required(),
        name: a.string().required(),
        description: a.string(),
        cover_card_id: a.id(),
        is_active: a.boolean(),
        total_power: a.integer().required(),
        wins: a.integer(),
        losses: a.integer(),
        created_at: a.string(),
        updated_at: a.string(),
        normalized_power: a.integer(),
        average_card_power: a.float(),
        size_factor: a.float(),
        high_tier_count: a.integer(),
        tier_distribution: a.json()
    }).identifier([
        "id"
    ]),
    "matches": a.model({
        id: a.id().required(),
        player1_id: a.id().required(),
        player2_id: a.id().required(),
        player1_deck_id: a.id().required(),
        player2_deck_id: a.id().required(),
        winner_id: a.id(),
        status: a.ref("MatchesStatus").required(),
        game_state: a.json().required(),
        start_time: a.string(),
        end_time: a.string(),
        created_at: a.string()
    }).identifier([
        "id"
    ]),
    "player_cards": a.model({
        id: a.id().required(),
        player_id: a.id().required(),
        card_id: a.id().required(),
        quantity: a.integer().required(),
        is_favorite: a.boolean(),
        obtained_at: a.string(),
        custom_skin_id: a.id()
    }).identifier([
        "id"
    ]),
    "players": a.model({
        id: a.id().required(),
        auth_id: a.string().required(),
        username: a.string().required(),
        email: a.string().required(),
        rank: a.integer(),
        souls: a.integer(),
        ember_shards: a.integer(),
        experience: a.integer(),
        level: a.integer(),
        win_count: a.integer(),
        loss_count: a.integer(),
        win_streak: a.integer(),
        highest_win_streak: a.integer(),
        active_avatar_frame: a.id(),
        active_card_back: a.id(),
        active_board_theme: a.id(),
        created_at: a.string(),
        last_login_at: a.string(),
        updated_at: a.string()
    }).identifier([
        "id"
    ]),
    CardsElement: a.enum([
        "none",
        "dark",
        "holy",
        "wind",
        "earth",
        "water",
        "fire"
    ]),
    CardsRarity: a.enum([
        "legendary",
        "epic",
        "rare",
        "common"
    ]),
    MatchesStatus: a.enum([
        "abandoned",
        "completed",
        "active",
        "pending"
    ])
});