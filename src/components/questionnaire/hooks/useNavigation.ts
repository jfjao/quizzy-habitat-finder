import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../QuestionnaireContext';
import { questions } from '../QuestionnaireData';
import { validateCurrentQuestion, isLastQuestion } from '../services/navigationService';

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
    if (isLastQuestion(currentQuestionIndex)) {
      handleSubmit();
      return;
    }
    
    // Otherwise, proceed to the next question
    setDirection('forward');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection('backward');
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
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
    isAtLastQuestion: isLastQuestion(currentQuestionIndex)
  };
};
