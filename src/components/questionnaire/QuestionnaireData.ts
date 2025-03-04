
import React from 'react';
import { House, Search, Bed, Bath, ParkingCircle, Trees, Shield, Zap, CloudSun, Wifi, MapPin, Coins, Users, CalendarDays, Building, Mountain, Car, Target, DollarSign, Droplets, School, ShoppingBag, Utensils, Hammer, Camera, Ruler, ScrollText, HomeIcon, BadgeDollarSign, Banknote, Home, LineChart, Clock, Scale, CreditCard, Presentation, FileCheck, FilePen, Construction, UserCircle, Cog, Clipboard } from 'lucide-react';
import { QuestionType } from './QuestionnaireContext';

export const questions: QuestionType[] = [
  // Question 1: Common starting point for all paths
  {
    id: 1,
    question: "Que recherchez-vous ?",
    options: [
      { id: "acheter", label: "Acheter", icon: React.createElement(Home, { className: "h-6 w-6" }) },
      { id: "louer", label: "Louer", icon: React.createElement(Key, { className: "h-6 w-6" }) },
      { id: "vendre", label: "Vendre", icon: React.createElement(BadgeDollarSign, { className: "h-6 w-6" }) }
    ]
  },
  
  // Questions for BUYERS (Acheter)
  {
    id: 2,
    question: "Quel type de bien recherchez-vous ?",
    options: [
      { id: "appartement", label: "Appartement", icon: React.createElement(Building, { className: "h-6 w-6" }) },
      { id: "maison", label: "Maison", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "villa", label: "Villa", icon: React.createElement(HomeIcon, { className: "h-6 w-6" }) },
      { id: "terrain", label: "Terrain", icon: React.createElement(Trees, { className: "h-6 w-6" }) },
      { id: "local_commercial", label: "Local commercial", icon: React.createElement(Building, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 3,
    question: "Dans quelle ville ou région de Madagascar ?",
    options: [
      { id: "antananarivo", label: "Antananarivo", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "tamatave", label: "Tamatave", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "nosy_be", label: "Nosy Be", icon: React.createElement(Mountain, { className: "h-6 w-6" }) },
      { id: "mahajanga", label: "Mahajanga", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "diego_suarez", label: "Diego Suarez", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "autre", label: "Autre", icon: React.createElement(MapPin, { className: "h-6 w-6" }) }
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
      { id: "analakely", label: "Analakely", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "ivandry", label: "Ivandry", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "andohalo", label: "Andohalo", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "ankadimbahoaka", label: "Ankadimbahoaka", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "amboditsiry", label: "Amboditsiry", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "autre_quartier", label: "Autre quartier", icon: React.createElement(MapPin, { className: "h-6 w-6" }) }
    ]
  },
  {
    id: 5,
    question: "Combien de chambres souhaitez-vous ?",
    options: [
      { id: "studio", label: "Studio", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "1", label: "1 chambre", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "2", label: "2 chambres", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "3", label: "3 chambres", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "4+", label: "4+ chambres", icon: React.createElement(Bed, { className: "h-6 w-6" }) }
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
      { id: "1", label: "1 salle de bain", icon: React.createElement(Bath, { className: "h-6 w-6" }) },
      { id: "2", label: "2 salles de bain", icon: React.createElement(Bath, { className: "h-6 w-6" }) },
      { id: "3+", label: "3+ salles de bain", icon: React.createElement(Bath, { className: "h-6 w-6" }) }
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
      { id: "immediatement", label: "Immédiatement", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) },
      { id: "1-3mois", label: "Dans 1 à 3 mois", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) },
      { id: "3-6mois", label: "Dans 3 à 6 mois", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) },
      { id: "6mois+", label: "Dans plus de 6 mois", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) }
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
      { id: "pres_ecole", label: "Près d'une école", icon: React.createElement(School, { className: "h-6 w-6" }) },
      { id: "pres_marche", label: "Près d'un marché", icon: React.createElement(ShoppingBag, { className: "h-6 w-6" }) },
      { id: "pres_restaurant", label: "Près des restaurants", icon: React.createElement(Utensils, { className: "h-6 w-6" }) },
      { id: "peu_importe", label: "Peu importe", icon: React.createElement(Target, { className: "h-6 w-6" }) }
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
      { id: "balcon", label: "Balcon/Terrasse", icon: React.createElement(CloudSun, { className: "h-6 w-6" }) },
      { id: "parking", label: "Parking", icon: React.createElement(ParkingCircle, { className: "h-6 w-6" }) },
      { id: "securite", label: "Sécurité/Gardiennage", icon: React.createElement(Shield, { className: "h-6 w-6" }) },
      { id: "calme", label: "Environnement calme", icon: React.createElement(CloudSun, { className: "h-6 w-6" }) },
      { id: "jardin", label: "Jardin", icon: React.createElement(Trees, { className: "h-6 w-6" }) },
      { id: "groupe_electrogene", label: "Groupe électrogène", icon: React.createElement(Zap, { className: "h-6 w-6" }) },
      { id: "wifi", label: "Connexion internet", icon: React.createElement(Wifi, { className: "h-6 w-6" }) },
      { id: "eau", label: "Accès à l'eau courante", icon: React.createElement(Droplets, { className: "h-6 w-6" }) }
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
      { id: "pret_a_habiter", label: "Je veux un bien prêt à habiter", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "petits_travaux", label: "Je peux faire quelques petits travaux", icon: React.createElement(Hammer, { className: "h-6 w-6" }) },
      { id: "renovation_complete", label: "Je suis prêt à faire une rénovation complète", icon: React.createElement(Hammer, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 11,
    question: "Qui va occuper ce logement ?",
    options: [
      { id: "seul", label: "Juste moi", icon: React.createElement(Users, { className: "h-6 w-6" }) },
      { id: "couple", label: "En couple", icon: React.createElement(Users, { className: "h-6 w-6" }) },
      { id: "famille", label: "En famille", icon: React.createElement(Users, { className: "h-6 w-6" }) },
      { id: "colocation", label: "En colocation", icon: React.createElement(Users, { className: "h-6 w-6" }) },
      { id: "professionnel", label: "Usage professionnel", icon: React.createElement(Building, { className: "h-6 w-6" }) }
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
      { id: "50000000", label: "< 50 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "100000000", label: "< 100 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "200000000", label: "< 200 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "500000000", label: "< 500 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "500000000+", label: "> 500 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 13,
    question: "Quel est votre budget mensuel maximum pour la location ?",
    options: [
      { id: "500000", label: "< 500 000 Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "1000000", label: "< 1 million Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "2000000", label: "< 2 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "5000000", label: "< 5 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "5000000+", label: "> 5 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "louer" }
  },
  {
    id: 14,
    question: "Comment préférez-vous payer ?",
    options: [
      { id: "comptant", label: "Comptant", icon: React.createElement(DollarSign, { className: "h-6 w-6" }) },
      { id: "credit", label: "Crédit", icon: React.createElement(CreditCard, { className: "h-6 w-6" }) },
      { id: "echelonne", label: "Paiement échelonné", icon: React.createElement(Banknote, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "acheter" }
  },
  {
    id: 15,
    question: "Quelle est la durée de location envisagée ?",
    options: [
      { id: "court", label: "Court terme (< 3 mois)", icon: React.createElement(Clock, { className: "h-6 w-6" }) },
      { id: "moyen", label: "Moyen terme (3-12 mois)", icon: React.createElement(Clock, { className: "h-6 w-6" }) },
      { id: "long", label: "Long terme (> 1 an)", icon: React.createElement(Clock, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "louer" }
  },
  
  // Questions for SELLERS (Vendre)
  {
    id: 16,
    question: "Quel type de bien souhaitez-vous vendre ?",
    options: [
      { id: "appartement", label: "Appartement", icon: React.createElement(Building, { className: "h-6 w-6" }) },
      { id: "maison", label: "Maison", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "villa", label: "Villa", icon: React.createElement(HomeIcon, { className: "h-6 w-6" }) },
      { id: "terrain", label: "Terrain", icon: React.createElement(Trees, { className: "h-6 w-6" }) },
      { id: "local_commercial", label: "Local commercial", icon: React.createElement(Building, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 17,
    question: "Où se situe votre bien ?",
    options: [
      { id: "antananarivo", label: "Antananarivo", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "tamatave", label: "Tamatave", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "nosy_be", label: "Nosy Be", icon: React.createElement(Mountain, { className: "h-6 w-6" }) },
      { id: "mahajanga", label: "Mahajanga", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "diego_suarez", label: "Diego Suarez", icon: React.createElement(MapPin, { className: "h-6 w-6" }) },
      { id: "autre", label: "Autre", icon: React.createElement(MapPin, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 18,
    question: "Quelle est la surface de votre bien ?",
    options: [
      { id: "petit", label: "< 50 m²", icon: React.createElement(Ruler, { className: "h-6 w-6" }) },
      { id: "moyen", label: "50-100 m²", icon: React.createElement(Ruler, { className: "h-6 w-6" }) },
      { id: "grand", label: "100-200 m²", icon: React.createElement(Ruler, { className: "h-6 w-6" }) },
      { id: "tres_grand", label: "> 200 m²", icon: React.createElement(Ruler, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 19,
    question: "Combien de chambres possède votre bien ?",
    options: [
      { id: "studio", label: "Studio", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "1", label: "1 chambre", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "2", label: "2 chambres", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "3", label: "3 chambres", icon: React.createElement(Bed, { className: "h-6 w-6" }) },
      { id: "4+", label: "4+ chambres", icon: React.createElement(Bed, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 20,
    question: "Avez-vous des photos de votre bien ?",
    options: [
      { id: "oui", label: "Oui, j'ai des photos professionnelles", icon: React.createElement(Camera, { className: "h-6 w-6" }) },
      { id: "amateur", label: "Oui, j'ai pris des photos moi-même", icon: React.createElement(Camera, { className: "h-6 w-6" }) },
      { id: "non", label: "Non, j'aurai besoin d'un photographe", icon: React.createElement(Camera, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 21,
    question: "État actuel du bien",
    options: [
      { id: "neuf", label: "Neuf/Excellent état", icon: React.createElement(Star, { className: "h-6 w-6" }) },
      { id: "bon", label: "Bon état", icon: React.createElement(ThumbsUp, { className: "h-6 w-6" }) },
      { id: "travaux", label: "Nécessite des travaux", icon: React.createElement(Construction, { className: "h-6 w-6" }) },
      { id: "renovation", label: "À rénover entièrement", icon: React.createElement(Hammer, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 22,
    question: "Avez-vous une estimation de prix en tête ?",
    options: [
      { id: "oui_precise", label: "Oui, j'ai un prix précis", icon: React.createElement(Scale, { className: "h-6 w-6" }) },
      { id: "oui_fourchette", label: "Oui, j'ai une fourchette de prix", icon: React.createElement(Scale, { className: "h-6 w-6" }) },
      { id: "non", label: "Non, j'ai besoin d'une estimation", icon: React.createElement(LineChart, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 23,
    question: "Possédez-vous tous les documents requis pour la vente ?",
    options: [
      { id: "oui", label: "Oui, tous les documents sont prêts", icon: React.createElement(FileCheck, { className: "h-6 w-6" }) },
      { id: "partiel", label: "Partiellement, certains sont manquants", icon: React.createElement(FilePen, { className: "h-6 w-6" }) },
      { id: "non", label: "Non, j'ai besoin d'aide pour les documents", icon: React.createElement(ScrollText, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 24,
    question: "Quand souhaitez-vous vendre ?",
    options: [
      { id: "urgent", label: "Urgent (< 1 mois)", icon: React.createElement(Clock, { className: "h-6 w-6" }) },
      { id: "rapide", label: "Rapidement (1-3 mois)", icon: React.createElement(Clock, { className: "h-6 w-6" }) },
      { id: "normal", label: "Délai normal (3-6 mois)", icon: React.createElement(Clock, { className: "h-6 w-6" }) },
      { id: "pas_presse", label: "Pas pressé (> 6 mois)", icon: React.createElement(Clock, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 25,
    question: "Quel niveau d'accompagnement souhaitez-vous ?",
    options: [
      { id: "complet", label: "Accompagnement complet", icon: React.createElement(UserCircle, { className: "h-6 w-6" }) },
      { id: "partiel", label: "Aide pour certaines étapes", icon: React.createElement(Clipboard, { className: "h-6 w-6" }) },
      { id: "minimal", label: "Simple mise en relation", icon: React.createElement(Cog, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "vendre" }
  }
];

// Add missing icons imports
import { Key, Star, ThumbsUp } from 'lucide-react';
