
import React from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './QuestionnaireData';
import { toast } from "sonner";

const QuestionOptions = () => {
  const { currentQuestionIndex, answers, setAnswers, direction } = useQuestionnaire();
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    const question = questions[currentQuestionIndex];
    
    // Handle multi-select questions
    if (question.multiSelect) {
      const currentAnswers = answers[question.id] as string[] || [];
      
      // If option is already selected, remove it, otherwise add it
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      
      setAnswers({ ...answers, [question.id]: newAnswers });
    } else {
      // For single-select questions, replace the answer
      setAnswers({ ...answers, [question.id]: optionId });
      
      // Automatically proceed to next question after a short delay
      setTimeout(() => {
        const event = new CustomEvent('nextQuestion');
        document.dispatchEvent(event);
      }, 400);
    }
  };

  // Check if an option is selected
  const isOptionSelected = (optionId: string) => {
    const currentAnswers = answers[currentQuestion.id];
    
    if (Array.isArray(currentAnswers)) {
      return currentAnswers.includes(optionId);
    }
    
    return currentAnswers === optionId;
  };

  return (
    <div className={`transform transition-all duration-500 ${
      direction === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
    }`}>
      <h2 className="mb-8 text-2xl font-medium md:text-3xl">
        {currentQuestion.question}
      </h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`
              flex flex-col items-center justify-center rounded-xl border border-border p-6 text-center transition-all duration-300
              ${isOptionSelected(option.id) 
                ? 'border-primary bg-primary/5 shadow-md' 
                : 'hover:border-primary/50 hover:bg-secondary'}
            `}
          >
            {option.icon && (
              <div className={`mb-3 ${isOptionSelected(option.id) ? 'text-primary' : ''}`}>
                {option.icon}
              </div>
            )}
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionOptions;
