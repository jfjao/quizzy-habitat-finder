
import { toast } from "sonner";
import { questions } from '../data';
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
  // Si nous sommes à la première question ou si la question n'a pas de condition showIf
  if (!question.showIf) return true;
  
  // Cas particulier pour la première question
  if (Object.keys(answers).length === 0) {
    // Pour les questions qui ont une condition sur la première question
    // Comme l'utilisateur n'a pas encore répondu, nous assumons qu'elles pourraient être visibles
    return true;
  }
  
  // Si la question a plusieurs conditions (tableau)
  if (Array.isArray(question.showIf)) {
    return question.showIf.some((condition: QuestionCondition) => {
      const answer = answers[condition.questionId];
      // Pour les réponses multi-select
      if (Array.isArray(answer)) {
        return answer.includes(condition.value);
      }
      // Pour les réponses single-select
      return answer === condition.value;
    });
  }
  
  // Pour une seule condition
  const { questionId, value } = question.showIf as QuestionCondition;
  const answer = answers[questionId];
  
  // Pour les réponses multi-select
  if (Array.isArray(answer)) {
    return answer.includes(value);
  }
  
  // Pour les réponses single-select
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
