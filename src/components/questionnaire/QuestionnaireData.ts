
import React from 'react';
import { House, Search, Bed, Bath, ParkingCircle, Trees, Shield, Zap, CloudSun, Wifi, MapPin, Coins, Users, CalendarDays, Building, Mountain, Car, Target, DollarSign, Droplets, School, ShoppingBag, Utensils, Hammer } from 'lucide-react';
import { QuestionType } from './QuestionnaireContext';

export const questions: QuestionType[] = [
  {
    id: 1,
    question: "Que recherchez-vous ?",
    options: [
      { id: "acheter", label: "Acheter", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "louer", label: "Louer", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "vendre", label: "Vendre", icon: React.createElement(Search, { className: "h-6 w-6" }) }
    ]
  },
  {
    id: 2,
    question: "Quel type de bien ?",
    options: [
      { id: "appartement", label: "Appartement", icon: React.createElement(Building, { className: "h-6 w-6" }) },
      { id: "maison", label: "Maison", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "villa", label: "Villa", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "terrain", label: "Terrain", icon: React.createElement(Trees, { className: "h-6 w-6" }) },
      { id: "local_commercial", label: "Local commercial", icon: React.createElement(Building, { className: "h-6 w-6" }) }
    ]
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
    ]
  },
  {
    id: 6,
    question: "Combien de salles de bain préférez-vous ?",
    options: [
      { id: "1", label: "1 salle de bain", icon: React.createElement(Bath, { className: "h-6 w-6" }) },
      { id: "2", label: "2 salles de bain", icon: React.createElement(Bath, { className: "h-6 w-6" }) },
      { id: "3+", label: "3+ salles de bain", icon: React.createElement(Bath, { className: "h-6 w-6" }) }
    ]
  },
  {
    id: 7,
    question: "Quand souhaitez-vous emménager/acheter ?",
    options: [
      { id: "immediatement", label: "Immédiatement", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) },
      { id: "1-3mois", label: "Dans 1 à 3 mois", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) },
      { id: "3-6mois", label: "Dans 3 à 6 mois", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) },
      { id: "6mois+", label: "Dans plus de 6 mois", icon: React.createElement(CalendarDays, { className: "h-6 w-6" }) }
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
    multiSelect: true
  },
  {
    id: 9,
    question: "Quels sont les critères importants pour vous ?",
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
    multiSelect: true
  },
  {
    id: 10,
    question: "Avez-vous besoin de rénovations ?",
    options: [
      { id: "pret_a_habiter", label: "Prêt à habiter", icon: React.createElement(House, { className: "h-6 w-6" }) },
      { id: "petits_travaux", label: "Petits travaux", icon: React.createElement(Hammer, { className: "h-6 w-6" }) },
      { id: "renovation_complete", label: "Rénovation complète", icon: React.createElement(Hammer, { className: "h-6 w-6" }) }
    ]
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
    ]
  },
  {
    id: 12,
    question: "Quel est votre budget maximum ?",
    options: [
      { id: "50000000", label: "< 50 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "100000000", label: "< 100 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "200000000", label: "< 200 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "500000000", label: "< 500 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) },
      { id: "500000000+", label: "> 500 millions Ar", icon: React.createElement(Coins, { className: "h-6 w-6" }) }
    ]
  },
  {
    id: 13,
    question: "Comment préférez-vous payer ?",
    options: [
      { id: "comptant", label: "Comptant", icon: React.createElement(DollarSign, { className: "h-6 w-6" }) },
      { id: "credit", label: "Crédit", icon: React.createElement(DollarSign, { className: "h-6 w-6" }) },
      { id: "echelonne", label: "Paiement échelonné", icon: React.createElement(DollarSign, { className: "h-6 w-6" }) }
    ],
    showIf: { questionId: 1, value: "acheter" }
  }
];
