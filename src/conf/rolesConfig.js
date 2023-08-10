
export const rolesConfig = {
    Gariban: {
      displayName: 'Gariban',
      passiveAbility: (player) => {
        player.coins += 1; // Increase coins by 1 for Gariban players
      },
      canTakeAction: false,
      description: 'Earns 1 coin each night they survive.',
    },
    
  Hırsız: {
    displayName: 'Hırsız',
    activeAbility: (player,chosenPlayerToRob) => {
      allPlayers.forEach((otherPlayer) => {
        if (otherPlayer.role === 'Gariban' && otherPlayer.coins > 0) {
          otherPlayer.coins -= 1; // Steal 1 coin from each Gariban player
          player.coins += 1; // Add the stolen coin to the Hırsız player
        }
      });
    },
    canTakeAction: true,
    description: 'Steals 1 coin from all Gariban players each night.',
  },
  Katil: {
    displayName: 'Katil',
    activeAbility: (player, allPlayers, setChosenPlayerToKill) => {
      // Allow the Katil player to choose a player to kill
      // Store the chosen player's information using setChosenPlayerToKill
    },
    canTakeAction: true,
    description: 'Kills a chosen player at the end of the night.',
  },
  };
  