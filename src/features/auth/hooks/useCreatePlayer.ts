// src/features/auth/hooks/useCreatePlayer.ts
import { generateClient } from '@aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

export async function createPlayerRecord() {
  try {
    const { userId, username, signInDetails } = await getCurrentUser();
    
    const existingPlayer = await client.models.players.get({
      auth_id: userId
    });

    if (!existingPlayer) {
      const newPlayer = await client.models.players.create({
        auth_id: userId,
        username: username || `player${userId.slice(-6)}`,
        email: signInDetails.loginId,
        rank: 1,
        souls: 1000,
        ember_shards: 100,
        experience: 0,
        level: 1,
        win_count: 0,
        loss_count: 0,
        win_streak: 0,
        highest_win_streak: 0
      });
      
      return newPlayer;
    }
    
    return existingPlayer;
  } catch (error) {
    console.error('Error creating player record:', error);
    throw error;
  }
}