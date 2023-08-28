
export const rolesConfig = {
    Gariban: {
      displayName: 'Gariban',
      passiveAbility: (player) => {
        player.coins += 5; // Increase coins by 1 for Gariban players
      },
      canTakeAction: false,
      description: 'Hayatta kaldığın her gece para kazan.',
    },
    
  Hırsız: {
    displayName: 'Hırsız',
    canTakeAction: true,
    description: 'Seçtiğin oyuncuyu soyup soğana çevir.',
  },
  Katil: {
    displayName: 'Katil',
    canTakeAction: true,
    description: 'Seçtiğin bir oyuncuyu gebert.',
  },
  Doktor:{
    displayName:'Doktor',
    canTakeAction:true,
    description:'Birinin hayatını kurtar.',
  }
  };
  