
import React from 'react';
import { House, Search } from 'lucide-react';
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
      { id: "appartement", label: "Appartement" },
      { id: "maison", label: "Maison" },
      { id: "villa", label: "Villa" },
      { id: "terrain", label: "Terrain" },
      { id: "local_commercial", label: "Local commercial" }
    ]
  },
  {
    id: 3,
    question: "Dans quelle ville ou région de Madagascar ?",
    options: [
      { id: "antananarivo", label: "Antananarivo" },
      { id: "tamatave", label: "Tamatave" },
      { id: "nosy_be", label: "Nosy Be" },
      { id: "mahajanga", label: "Mahajanga" },
      { id: "diego_suarez", label: "Diego Suarez" },
      { id: "autre", label: "Autre" }
    ]
  },
  {
    id: 4,
    question: "Quels sont les critères importants pour vous ?",
    options: [
      { id: "balcon", label: "Balcon/Terrasse" },
      { id: "parking", label: "Parking" },
      { id: "securite", label: "Sécurité/Gardiennage" },
      { id: "calme", label: "Environnement calme" },
      { id: "jardin", label: "Jardin" },
      { id: "groupe_electrogene", label: "Groupe électrogène" }
    ],
    multiSelect: true
  },
  {
    id: 5,
    question: "Quel est votre budget maximum ?",
    options: [
      { id: "50000000", label: "< 50 millions Ar" },
      { id: "100000000", label: "< 100 millions Ar" },
      { id: "200000000", label: "< 200 millions Ar" },
      { id: "500000000", label: "< 500 millions Ar" },
      { id: "500000000+", label: "> 500 millions Ar" }
    ]
  }
];
