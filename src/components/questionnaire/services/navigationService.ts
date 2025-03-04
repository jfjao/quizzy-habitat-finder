
import { toast } from "sonner";
import { questions } from '../QuestionnaireData';
import { AnswersType, QuestionCondition } from '../QuestionnaireContext';

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

export const shouldShowQuestion = (question: any, answers: AnswersType): boolean => {
  if (!question.showIf) return true;
  
  // If question has multiple conditions (array)
  if (Array.isArray(question.showIf)) {
    return question.showIf.some((condition: QuestionCondition) => {
      const answer = answers[condition.questionId];
      // For multi-select answers
      if (Array.isArray(answer)) {
        return answer.includes(condition.value);
      }
      // For single-select answers
      return answer === condition.value;
    });
  }
  
  // For single condition
  const { questionId, value } = question.showIf as QuestionCondition;
  const answer = answers[questionId];
  
  // For multi-select answers
  if (Array.isArray(answer)) {
    return answer.includes(value);
  }
  
  // For single-select answers
  return answer === value;
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
  
  // Check if the next question should be shown based on conditions
  while (nextIndex < questions.length) {
    const nextQuestion = questions[nextIndex];
    if (shouldShowQuestion(nextQuestion, answers)) {
      return nextIndex;
    }
    nextIndex++;
  }
  
  // If no more questions should be shown, return the current index
  return currentQuestionIndex;
};

export const getPreviousQuestionIndex = (
  currentQuestionIndex: number,
  answers: AnswersType
): number => {
  if (currentQuestionIndex <= 0) {
    return 0;
  }
  
  let prevIndex = currentQuestionIndex - 1;
  
  // Check if the previous question should be shown based on conditions
  while (prevIndex >= 0) {
    const prevQuestion = questions[prevIndex];
    if (shouldShowQuestion(prevQuestion, answers)) {
      return prevIndex;
    }
    prevIndex--;
  }
  
  return 0;
};

export const isLastQuestion = (currentQuestionIndex: number, answers: AnswersType): boolean => {
  // Check if this is the last visible question based on showIf conditions
  const nextIndex = getNextQuestionIndex(currentQuestionIndex, answers);
  return nextIndex === currentQuestionIndex;
};
