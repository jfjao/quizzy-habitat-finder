
import { QuestionType } from '../QuestionnaireContext';
import { icons } from './types';

export const commonQuestions: QuestionType[] = [
  // Question 1: Common starting point for all paths
  {
    id: 1,
    question: "Que recherchez-vous ?",
    options: [
      { id: "acheter", label: "Acheter", icon: icons.Home },
      { id: "louer", label: "Louer", icon: icons.Key },
      { id: "vendre", label: "Vendre", icon: icons.BadgeDollarSign }
    ]
  }
];
