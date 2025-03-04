import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './QuestionnaireData';
import { toast } from "sonner";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    answers, 
    setDirection 
  } = useQuestionnaire();

  const handleNextQuestion = () => {
    // Check if a response has been given to the current question
    const currentQuestionId = questions[currentQuestionIndex].id;
    const currentAnswer = answers[currentQuestionId];
    
    if (!currentAnswer && !questions[currentQuestionIndex].multiSelect) {
      toast.error("Veuillez sélectionner une option pour continuer");
      return;
    }
    
    if (questions[currentQuestionIndex].multiSelect && 
        (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0))) {
      toast.error("Veuillez sélectionner au moins une option pour continuer");
      return;
    }
    
    // If it's the last question, submit the form
    if (currentQuestionIndex === questions.length - 1) {
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

  return (
    <div className="mt-10 flex items-center justify-between">
      <button
        onClick={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
        className={`
          flex items-center space-x-2 rounded-lg px-4 py-2 text-sm transition-all
          ${currentQuestionIndex === 0 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:bg-secondary'}
        `}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Précédent</span>
      </button>
      
      <button
        onClick={handleNextQuestion}
        className="flex items-center space-x-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-md"
      >
        <span>{currentQuestionIndex === questions.length - 1 ? 'Voir les résultats' : 'Suivant'}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NavigationButtons;
