// src/hooks/useMatchSubscription.ts
export function useMatchSubscription(matchId: string) {
    useEffect(() => {
      const subscription = client.models.Match.observeQuery({
        filter: { id: { eq: matchId } },
        include: {
          moves: true,
          player1: true,
          player2: true
        }
      }).subscribe({
        next: ({ items: [match] }) => {
          // Update game state
        }
      });
  
      return () => subscription.unsubscribe();
    }, [matchId]);
  }