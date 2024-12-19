// src/hooks/usePlayerCards.ts
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { schema } from '../../../amplify/data/schema';

const client = generateClient<typeof schema>();

export function usePlayerCards(playerId: string) {
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    const subscription = client.models.PlayerCard.observeQuery({
      filter: { playerId: { eq: playerId } },
      include: {
        card: true
      }
    }).subscribe({
      next: ({ items }) => setCards(items)
    });

    return () => subscription.unsubscribe();
  }, [playerId]);

  return cards;
}