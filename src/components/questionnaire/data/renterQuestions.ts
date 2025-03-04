
import { QuestionType } from '../QuestionnaireContext';
import { icons } from './types';

export const renterQuestions: QuestionType[] = [
  {
    id: 13,
    question: "Quel est votre budget mensuel maximum pour la location ?",
    options: [
      { id: "500000", label: "< 500 000 Ar", icon: icons.Coins },
      { id: "1000000", label: "< 1 million Ar", icon: icons.Coins },
      { id: "2000000", label: "< 2 millions Ar", icon: icons.Coins },
      { id: "5000000", label: "< 5 millions Ar", icon: icons.Coins },
      { id: "5000000+", label: "> 5 millions Ar", icon: icons.Coins }
    ],
    showIf: { questionId: 1, value: "louer" }
  },
  {
    id: 15,
    question: "Quelle est la durée de location envisagée ?",
    options: [
      { id: "court", label: "Court terme (< 3 mois)", icon: icons.Clock },
      { id: "moyen", label: "Moyen terme (3-12 mois)", icon: icons.Clock },
      { id: "long", label: "Long terme (> 1 an)", icon: icons.Clock }
    ],
    showIf: { questionId: 1, value: "louer" }
  }
];
