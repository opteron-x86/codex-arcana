import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';

const client = generateClient<typeof schema>();

export function usePlayerCollection(playerId: string) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCollection() {
      try {
        // Fetch player's cards
        const playerCards = await client.models.PlayerCard.list({
          filter: { playerId: { eq: playerId } },
          include: {
            card: true
          }
        });

        // Fetch player's decks
        const playerDecks = await client.models.Deck.list({
          filter: { playerId: { eq: playerId } },
          include: {
            cards: {
              include: {
                playerCard: {
                  include: {
                    card: true
                  }
                }
              }
            }
          }
        });

        setCards(playerCards.data);
        setDecks(playerDecks.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadCollection();
  }, [playerId]);

  // Save deck function
  const saveDeck = async (deckData) => {
    try {
      if (deckData.id === 'new') {
        // Create new deck
        await client.models.Deck.create({
          playerId,
          name: deckData.name,
          // Add other deck data
        });
      } else {
        // Update existing deck
        await client.models.Deck.update({
          id: deckData.id,
          name: deckData.name,
          // Add other deck data
        });
      }
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    cards,
    decks,
    loading,
    error,
    saveDeck
  };
}