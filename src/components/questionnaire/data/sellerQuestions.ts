
import { QuestionType } from '../QuestionnaireContext';
import { icons } from './types';

export const sellerQuestions: QuestionType[] = [
  // Questions for SELLERS (Vendre)
  {
    id: 16,
    question: "Quel type de bien souhaitez-vous vendre ?",
    options: [
      { id: "appartement", label: "Appartement", icon: icons.Building },
      { id: "maison", label: "Maison", icon: icons.House },
      { id: "villa", label: "Villa", icon: icons.HomeIcon },
      { id: "terrain", label: "Terrain", icon: icons.Trees },
      { id: "local_commercial", label: "Local commercial", icon: icons.Building }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 17,
    question: "Où se situe votre bien ?",
    options: [
      { id: "antananarivo", label: "Antananarivo", icon: icons.MapPin },
      { id: "tamatave", label: "Tamatave", icon: icons.MapPin },
      { id: "nosy_be", label: "Nosy Be", icon: icons.Mountain },
      { id: "mahajanga", label: "Mahajanga", icon: icons.MapPin },
      { id: "diego_suarez", label: "Diego Suarez", icon: icons.MapPin },
      { id: "autre", label: "Autre", icon: icons.MapPin }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 18,
    question: "Quelle est la surface de votre bien ?",
    options: [
      { id: "petit", label: "< 50 m²", icon: icons.Ruler },
      { id: "moyen", label: "50-100 m²", icon: icons.Ruler },
      { id: "grand", label: "100-200 m²", icon: icons.Ruler },
      { id: "tres_grand", label: "> 200 m²", icon: icons.Ruler }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 19,
    question: "Combien de chambres possède votre bien ?",
    options: [
      { id: "studio", label: "Studio", icon: icons.Bed },
      { id: "1", label: "1 chambre", icon: icons.Bed },
      { id: "2", label: "2 chambres", icon: icons.Bed },
      { id: "3", label: "3 chambres", icon: icons.Bed },
      { id: "4+", label: "4+ chambres", icon: icons.Bed }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 20,
    question: "Avez-vous des photos de votre bien ?",
    options: [
      { id: "oui", label: "Oui, j'ai des photos professionnelles", icon: icons.Camera },
      { id: "amateur", label: "Oui, j'ai pris des photos moi-même", icon: icons.Camera },
      { id: "non", label: "Non, j'aurai besoin d'un photographe", icon: icons.Camera }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 21,
    question: "État actuel du bien",
    options: [
      { id: "neuf", label: "Neuf/Excellent état", icon: icons.Star },
      { id: "bon", label: "Bon état", icon: icons.ThumbsUp },
      { id: "travaux", label: "Nécessite des travaux", icon: icons.Construction },
      { id: "renovation", label: "À rénover entièrement", icon: icons.Hammer }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 22,
    question: "Avez-vous une estimation de prix en tête ?",
    options: [
      { id: "oui_precise", label: "Oui, j'ai un prix précis", icon: icons.Scale },
      { id: "oui_fourchette", label: "Oui, j'ai une fourchette de prix", icon: icons.Scale },
      { id: "non", label: "Non, j'ai besoin d'une estimation", icon: icons.LineChart }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 23,
    question: "Possédez-vous tous les documents requis pour la vente ?",
    options: [
      { id: "oui", label: "Oui, tous les documents sont prêts", icon: icons.FileCheck },
      { id: "partiel", label: "Partiellement, certains sont manquants", icon: icons.FilePen },
      { id: "non", label: "Non, j'ai besoin d'aide pour les documents", icon: icons.ScrollText }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 24,
    question: "Quand souhaitez-vous vendre ?",
    options: [
      { id: "urgent", label: "Urgent (< 1 mois)", icon: icons.Clock },
      { id: "rapide", label: "Rapidement (1-3 mois)", icon: icons.Clock },
      { id: "normal", label: "Délai normal (3-6 mois)", icon: icons.Clock },
      { id: "pas_presse", label: "Pas pressé (> 6 mois)", icon: icons.Clock }
    ],
    showIf: { questionId: 1, value: "vendre" }
  },
  {
    id: 25,
    question: "Quel niveau d'accompagnement souhaitez-vous ?",
    options: [
      { id: "complet", label: "Accompagnement complet", icon: icons.UserCircle },
      { id: "partiel", label: "Aide pour certaines étapes", icon: icons.Clipboard },
      { id: "minimal", label: "Simple mise en relation", icon: icons.Cog }
    ],
    showIf: { questionId: 1, value: "vendre" }
  }
];
