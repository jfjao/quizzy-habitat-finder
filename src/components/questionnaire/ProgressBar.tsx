
import React, { useMemo } from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './data';
import { shouldShowQuestion } from './services/navigationService';

const ProgressBar = () => {
  const { currentQuestionIndex, answers } = useQuestionnaire();
  
  // Calculate visible questions based on current answers
  const visibleQuestions = useMemo(() => {
    // For the first question, we don't know the path yet, so we need to show a different calculation
    if (currentQuestionIndex === 0) {
      // Just return first question for now since user hasn't made any selections yet
      return [questions[0]];
    }
    
    // After first question is answered, calculate based on selected path
    return questions.filter(question => shouldShowQuestion(question, answers));
  }, [answers, currentQuestionIndex]);
  
  // Find the index of the current question in the visible questions array
  const currentVisibleIndex = visibleQuestions.findIndex(q => q.id === questions[currentQuestionIndex].id);
  
  // Calculate total visible questions based on path selected
  const totalVisibleQuestions = visibleQuestions.length;
  
  // Calculate progress percentage
  const progress = totalVisibleQuestions > 0 
    ? ((currentVisibleIndex + 1) / totalVisibleQuestions) * 100 
    : 0;

  // Format for display
  const questionNumber = currentVisibleIndex + 1;
  const totalQuestions = totalVisibleQuestions;
  
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Question {questionNumber}/{totalQuestions}
        </span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
