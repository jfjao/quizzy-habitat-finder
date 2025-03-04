
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

export const getNextQuestionIndex = (
  currentQuestionIndex: number,
  answers: AnswersType
): number => {
  let nextIndex = currentQuestionIndex + 1;
  
  // If we've reached the end of the questions, return the current index
  if (nextIndex >= questions.length) {
    return currentQuestionIndex;
  }
  
  // Check if the next question has a showIf condition
  const nextQuestion = questions[nextIndex];
  if (nextQuestion.showIf) {
    const { questionId, value } = nextQuestion.showIf;
    const answer = answers[questionId];
    
    // If the answer doesn't match the condition, skip this question
    if (answer !== value) {
      return getNextQuestionIndex(nextIndex, answers);
    }
  }
  
  return nextIndex;
};

export const getPreviousQuestionIndex = (
  currentQuestionIndex: number,
  answers: AnswersType
): number => {
  if (currentQuestionIndex <= 0) {
    return 0;
  }
  
  let prevIndex = currentQuestionIndex - 1;
  
  // Check if the previous question has a showIf condition
  const prevQuestion = questions[prevIndex];
  if (prevQuestion.showIf) {
    const { questionId, value } = prevQuestion.showIf;
    const answer = answers[questionId];
    
    // If the answer doesn't match the condition, skip this question
    if (answer !== value) {
      return getPreviousQuestionIndex(prevIndex, answers);
    }
  }
  
  return prevIndex;
};

export const isLastQuestion = (currentQuestionIndex: number, answers: AnswersType): boolean => {
  // Check if this is the last visible question based on showIf conditions
  const nextIndex = getNextQuestionIndex(currentQuestionIndex, answers);
  return nextIndex === currentQuestionIndex;
};
