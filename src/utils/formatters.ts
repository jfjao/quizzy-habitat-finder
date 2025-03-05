
/**
 * Formate un nombre en Ariary (monnaie malgache)
 * @param amount - Le montant à formater
 * @returns Le montant formaté avec le symbole Ar et les séparateurs de milliers
 */
export const formatAriary = (amount: number): string => {
  return `${amount.toLocaleString('fr-MG')} Ar`;
};

/**
 * Formate un nombre en mètre carré
 * @param value - La valeur à formater
 * @returns La valeur formatée avec le symbole m²
 */
export const formatSquareMeters = (value: number): string => {
  return `${value} m²`;
};

/**
 * Formate un prix au mètre carré en Ariary
 * @param pricePerSqm - Le prix au mètre carré
 * @returns Le prix formaté avec séparateurs de milliers et symbole Ar/m²
 */
export const formatPricePerSquareMeter = (pricePerSqm: number): string => {
  return `${pricePerSqm.toLocaleString('fr-MG')} Ar/m²`;
};
