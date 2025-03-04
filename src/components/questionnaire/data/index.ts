
import { commonQuestions } from './commonQuestions';
import { buyerQuestions } from './buyerQuestions';
import { renterQuestions } from './renterQuestions';
import { sellerQuestions } from './sellerQuestions';
import { QuestionType } from '../QuestionnaireContext';

// Combine all questions into a single array
export const questions: QuestionType[] = [
  ...commonQuestions,
  ...buyerQuestions,
  ...renterQuestions,
  ...sellerQuestions
];
