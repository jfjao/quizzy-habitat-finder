
import React from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './QuestionnaireData';

const ProgressBar = () => {
  const { currentQuestionIndex } = useQuestionnaire();
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Question {currentQuestionIndex + 1}/{totalQuestions}</span>
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
