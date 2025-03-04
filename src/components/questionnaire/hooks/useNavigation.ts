
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../QuestionnaireContext';
import { questions } from '../data';
import { 
  validateCurrentQuestion, 
  isLastQuestion, 
  getNextQuestionIndex, 
  getPreviousQuestionIndex 
} from '../services/navigationService';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    answers, 
    setDirection 
  } = useQuestionnaire();

  const handleNextQuestion = () => {
    // Validate the current question
    if (!validateCurrentQuestion(currentQuestionIndex, answers)) {
      return;
    }
    
    // If it's the last question, submit the form
    if (isLastQuestion(currentQuestionIndex, answers)) {
      handleSubmit();
      return;
    }
    
    // Otherwise, proceed to the next question
    setDirection('forward');
    const nextIndex = getNextQuestionIndex(currentQuestionIndex, answers);
    setCurrentQuestionIndex(nextIndex);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection('backward');
      const prevIndex = getPreviousQuestionIndex(currentQuestionIndex, answers);
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleSubmit = () => {
    // Simulate search and redirect to results
    setTimeout(() => {
      navigate('/results', { state: { answers } });
    }, 500);
  };

  // Add event listener for auto-advance after option selection
  useEffect(() => {
    const handleAutoAdvance = () => handleNextQuestion();
    document.addEventListener('nextQuestion', handleAutoAdvance);
    
    return () => {
      document.removeEventListener('nextQuestion', handleAutoAdvance);
    };
  }, [currentQuestionIndex, answers]);

  return {
    handleNextQuestion,
    handlePreviousQuestion,
    isAtFirstQuestion: currentQuestionIndex === 0,
    isAtLastQuestion: isLastQuestion(currentQuestionIndex, answers)
  };
};
