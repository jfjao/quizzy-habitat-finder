
import React, { useMemo } from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './data';
import { shouldShowQuestion } from './services/navigationService';

const ProgressBar = () => {
  const { currentQuestionIndex, answers } = useQuestionnaire();
  
  // Calculate visible questions based on current answers
  const visibleQuestions = useMemo(() => {
    return questions.filter(question => shouldShowQuestion(question, answers));
  }, [answers]);
  
  const currentVisibleIndex = visibleQuestions.findIndex(q => q.id === questions[currentQuestionIndex].id);
  const totalVisibleQuestions = visibleQuestions.length;
  const progress = totalVisibleQuestions > 0 ? ((currentVisibleIndex + 1) / totalVisibleQuestions) * 100 : 0;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Question {currentVisibleIndex + 1}/{totalVisibleQuestions}</span>
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
