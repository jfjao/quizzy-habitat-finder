
import { toast } from "sonner";
import { questions } from '../QuestionnaireData';
import { AnswersType } from '../QuestionnaireContext';

export const validateCurrentQuestion = (
  currentQuestionIndex: number, 
  answers: AnswersType
): boolean => {
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionId = currentQuestion.id;
  const currentAnswer = answers[currentQuestionId];
  
  if (!currentAnswer && !currentQuestion.multiSelect) {
    toast.error("Veuillez sélectionner une option pour continuer");
    return false;
  }
  
  if (currentQuestion.multiSelect && 
      (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0))) {
    toast.error("Veuillez sélectionner au moins une option pour continuer");
    return false;
  }
  
  return true;
};

export const isLastQuestion = (currentQuestionIndex: number): boolean => {
  return currentQuestionIndex === questions.length - 1;
};
