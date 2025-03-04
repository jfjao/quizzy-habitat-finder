
import { QuestionType } from '../QuestionnaireContext';
import { icons } from './types';

export const buyerQuestions: QuestionType[] = [
  // Questions for BUYERS (Acheter)
  {
    id: 2,
    question: "Quel type de bien recherchez-vous ?",
    options: [
      { id: "appartement", label: "Appartement", icon: icons.Building },
      { id: "maison", label: "Maison", icon: icons.House },
      { id: "villa", label: "Villa", icon: icons.HomeIcon },
      { id: "terrain", label: "Terrain", icon: icons.Trees },
      { id: "local_commercial", label: "Local commercial", icon: icons.Building }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 3,
    question: "Dans quelle ville ou région de Madagascar ?",
    options: [
      { id: "antananarivo", label: "Antananarivo", icon: icons.MapPin },
      { id: "tamatave", label: "Tamatave", icon: icons.MapPin },
      { id: "nosy_be", label: "Nosy Be", icon: icons.Mountain },
      { id: "mahajanga", label: "Mahajanga", icon: icons.MapPin },
      { id: "diego_suarez", label: "Diego Suarez", icon: icons.MapPin },
      { id: "autre", label: "Autre", icon: icons.MapPin }
    ],
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 4,
    question: "Quel quartier préférez-vous ?",
    showIf: { questionId: 3, value: "antananarivo" },
    options: [
      { id: "analakely", label: "Analakely", icon: icons.MapPin },
      { id: "ivandry", label: "Ivandry", icon: icons.MapPin },
      { id: "andohalo", label: "Andohalo", icon: icons.MapPin },
      { id: "ankadimbahoaka", label: "Ankadimbahoaka", icon: icons.MapPin },
      { id: "amboditsiry", label: "Amboditsiry", icon: icons.MapPin },
      { id: "autre_quartier", label: "Autre quartier", icon: icons.MapPin }
    ]
  },
  {
    id: 5,
    question: "Combien de chambres souhaitez-vous ?",
    options: [
      { id: "studio", label: "Studio", icon: icons.Bed },
      { id: "1", label: "1 chambre", icon: icons.Bed },
      { id: "2", label: "2 chambres", icon: icons.Bed },
      { id: "3", label: "3 chambres", icon: icons.Bed },
      { id: "4+", label: "4+ chambres", icon: icons.Bed }
    ],
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 6,
    question: "Combien de salles de bain préférez-vous ?",
    options: [
      { id: "1", label: "1 salle de bain", icon: icons.Bath },
      { id: "2", label: "2 salles de bain", icon: icons.Bath },
      { id: "3+", label: "3+ salles de bain", icon: icons.Bath }
    ],
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 7,
    question: "Quand souhaitez-vous emménager ?",
    options: [
      { id: "immediatement", label: "Immédiatement", icon: icons.CalendarDays },
      { id: "1-3mois", label: "Dans 1 à 3 mois", icon: icons.CalendarDays },
      { id: "3-6mois", label: "Dans 3 à 6 mois", icon: icons.CalendarDays },
      { id: "6mois+", label: "Dans plus de 6 mois", icon: icons.CalendarDays }
    ],
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 8,
    question: "À quelle distance des commodités souhaitez-vous être ?",
    options: [
      { id: "pres_ecole", label: "Près d'une école", icon: icons.School },
      { id: "pres_marche", label: "Près d'un marché", icon: icons.ShoppingBag },
      { id: "pres_restaurant", label: "Près des restaurants", icon: icons.Utensils },
      { id: "peu_importe", label: "Peu importe", icon: icons.Target }
    ],
    multiSelect: true,
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 9,
    question: "Quels critères sont importants pour vous ?",
    options: [
      { id: "balcon", label: "Balcon/Terrasse", icon: icons.CloudSun },
      { id: "parking", label: "Parking", icon: icons.ParkingCircle },
      { id: "securite", label: "Sécurité/Gardiennage", icon: icons.Shield },
      { id: "calme", label: "Environnement calme", icon: icons.CloudSun },
      { id: "jardin", label: "Jardin", icon: icons.Trees },
      { id: "groupe_electrogene", label: "Groupe électrogène", icon: icons.Zap },
      { id: "wifi", label: "Connexion internet", icon: icons.Wifi },
      { id: "eau", label: "Accès à l'eau courante", icon: icons.Droplets }
    ],
    multiSelect: true,
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 10,
    question: "Êtes-vous prêt à faire des rénovations ?",
    options: [
      { id: "pret_a_habiter", label: "Je veux un bien prêt à habiter", icon: icons.House },
      { id: "petits_travaux", label: "Je peux faire quelques petits travaux", icon: icons.Hammer },
      { id: "renovation_complete", label: "Je suis prêt à faire une rénovation complète", icon: icons.Hammer }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 11,
    question: "Qui va occuper ce logement ?",
    options: [
      { id: "seul", label: "Juste moi", icon: icons.Users },
      { id: "couple", label: "En couple", icon: icons.Users },
      { id: "famille", label: "En famille", icon: icons.Users },
      { id: "colocation", label: "En colocation", icon: icons.Users },
      { id: "professionnel", label: "Usage professionnel", icon: icons.Building }
    ],
    showIf: [
      { questionId: 1, value: "acheter" },
      { questionId: 1, value: "louer" }
    ]
  },
  {
    id: 12,
    question: "Quel est votre budget maximum pour l'achat ?",
    options: [
      { id: "50000000", label: "< 50 millions Ar", icon: icons.Coins },
      { id: "100000000", label: "< 100 millions Ar", icon: icons.Coins },
      { id: "200000000", label: "< 200 millions Ar", icon: icons.Coins },
      { id: "500000000", label: "< 500 millions Ar", icon: icons.Coins },
      { id: "500000000+", label: "> 500 millions Ar", icon: icons.Coins }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 14,
    question: "Comment préférez-vous payer ?",
    options: [
      { id: "comptant", label: "Comptant", icon: icons.DollarSign },
      { id: "credit", label: "Crédit", icon: icons.CreditCard },
      { id: "echelonne", label: "Paiement échelonné", icon: icons.Banknote }
    ],
    showIf: { questionId: 1, value: "acheter" }
  }
];
