
// Données fictives pour la démonstration

export const getMockNeighborhoodPrices = (propertyType: string) => {
  // Simulation de données différentes selon le type de bien
  const baseData = [
    { id: '1', name: 'Centre-Ville', price: 4500, transactions: 45 },
    { id: '2', name: 'Analakely', price: 3800, transactions: 32 },
    { id: '3', name: 'Antanimena', price: 3200, transactions: 28 },
    { id: '4', name: 'Isoraka', price: 4200, transactions: 21 },
    { id: '5', name: 'Andraharo', price: 3900, transactions: 38 },
    { id: '6', name: 'Ankorondrano', price: 4100, transactions: 43 },
    { id: '7', name: 'Ivandry', price: 4300, transactions: 26 },
    { id: '8', name: 'Ambatobe', price: 3600, transactions: 19 },
  ];

  // Variation des prix selon le type de propriété
  let modifier = 1;
  switch (propertyType) {
    case 'apartment':
      modifier = 1.2;
      break;
    case 'house':
      modifier = 0.9;
      break;
    case 'villa':
      modifier = 1.5;
      break;
    case 'land':
      modifier = 0.6;
      break;
    default:
      modifier = 1;
  }

  return baseData.map(item => ({
    ...item,
    price: Math.round(item.price * modifier)
  }));
};

export const getMockActiveNeighborhoods = (propertyType: string) => {
  // Données de base
  const baseData = [
    { id: '1', name: 'Centre-Ville', transactions: 45, pricePerSqm: 4500, trend: 'up' as const },
    { id: '2', name: 'Analakely', transactions: 32, pricePerSqm: 3800, trend: 'down' as const },
    { id: '3', name: 'Antanimena', transactions: 28, pricePerSqm: 3200, trend: 'stable' as const },
    { id: '4', name: 'Isoraka', transactions: 21, pricePerSqm: 4200, trend: 'up' as const },
    { id: '5', name: 'Andraharo', transactions: 38, pricePerSqm: 3900, trend: 'up' as const },
    { id: '6', name: 'Ankorondrano', transactions: 43, pricePerSqm: 4100, trend: 'stable' as const },
    { id: '7', name: 'Ivandry', transactions: 26, pricePerSqm: 4300, trend: 'down' as const },
    { id: '8', name: 'Ambatobe', transactions: 19, pricePerSqm: 3600, trend: 'up' as const },
  ];

  // Variation selon le type de propriété
  let priceModifier = 1;
  let transactionModifier = 1;
  
  switch (propertyType) {
    case 'apartment':
      priceModifier = 1.2;
      transactionModifier = 1.3;
      break;
    case 'house':
      priceModifier = 0.9;
      transactionModifier = 0.8;
      break;
    case 'villa':
      priceModifier = 1.5;
      transactionModifier = 0.5;
      break;
    case 'land':
      priceModifier = 0.6;
      transactionModifier = 0.7;
      break;
    default:
      priceModifier = 1;
      transactionModifier = 1;
  }

  return baseData.map(item => ({
    ...item,
    pricePerSqm: Math.round(item.pricePerSqm * priceModifier),
    transactions: Math.round(item.transactions * transactionModifier)
  }));
};

export const getMockPriceHistory = (timeFrame: string, propertyType: string) => {
  // Périodes différentes selon le timeFrame
  let months = 6;
  switch (timeFrame) {
    case '6m':
      months = 6;
      break;
    case '1y':
      months = 12;
      break;
    case '5y':
      months = 60;
      break;
    default:
      months = 12;
  }

  // Prix de base qui varie selon le type de propriété
  let basePrice = 4000;
  switch (propertyType) {
    case 'apartment':
      basePrice = 4200;
      break;
    case 'house':
      basePrice = 3800;
      break;
    case 'villa':
      basePrice = 5500;
      break;
    case 'land':
      basePrice = 2500;
      break;
    default:
      basePrice = 4000;
  }

  // Génération des données historiques
  const now = new Date();
  const data = [];
  const volatility = 0.03; // 3% de volatilité mensuelle
  let price = basePrice;
  let trend = basePrice;
  
  for (let i = 0; i < months; i++) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - (months - i));
    const month = date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    
    // Variation aléatoire autour d'une tendance
    const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;
    price = Math.round(price * randomFactor);
    
    // Tendance générale (légère hausse)
    trend = basePrice * (1 + i * 0.01);
    
    data.push({
      date: month,
      price,
      trend: Math.round(trend)
    });
  }

  return data;
};
