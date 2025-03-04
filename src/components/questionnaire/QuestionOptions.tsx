
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
      
      // Show toast for multi-select options
      if (!currentAnswers.includes(optionId)) {
        toast.success(`Option ajoutée: ${question.options.find(o => o.id === optionId)?.label}`, {
          icon: question.options.find(o => o.id === optionId)?.icon,
        });
      } else {
        toast.info(`Option retirée: ${question.options.find(o => o.id === optionId)?.label}`, {
          icon: question.options.find(o => o.id === optionId)?.icon,
        });
      }
    } else {
      // For single-select questions, replace the answer
      setAnswers({ ...answers, [question.id]: optionId });
      
      // Automatically proceed to next question after a short delay
      setTimeout(() => {
        const event = new CustomEvent('nextQuestion');
        document.dispatchEvent(event);
      }, 400);
      
      // Show toast for single-select options
      const selectedLabel = question.options.find(o => o.id === optionId)?.label;
      toast.success(`Vous avez choisi: ${selectedLabel}`, {
        icon: question.options.find(o => o.id === optionId)?.icon,
      });
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

  // Direction-based animation classes
  const getTransitionClass = () => {
    if (direction === 'forward') {
      return 'translate-x-0 opacity-100';
    } else {
      return '-translate-x-10 opacity-0';
    }
  };

  return (
    <div className={`transform transition-all duration-500 ${getTransitionClass()}`}>
      <h2 className="mb-8 text-2xl font-medium text-center md:text-3xl animate-fade-in">
        {currentQuestion.question}
      </h2>
      
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3`}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`
              flex flex-col items-center justify-center rounded-xl border border-border p-6 text-center 
              transition-all duration-300 hover-lift backdrop-blur-sm
              ${isOptionSelected(option.id) 
                ? 'border-primary bg-primary/10 shadow-lg transform scale-105' 
                : 'hover:border-primary/50 hover:bg-secondary/80 hover:scale-105'}
              animate-fade-in
            `}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transform: isOptionSelected(option.id) ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {option.icon && (
              <div className={`mb-3 transition-all duration-300 ${
                isOptionSelected(option.id) 
                  ? 'text-primary scale-125 transform animate-pulse-soft' 
                  : 'text-muted-foreground'
              }`}>
                {option.icon}
              </div>
            )}
            <span className={`font-medium transition-all duration-300 ${
              isOptionSelected(option.id) ? 'text-primary' : ''
            }`}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionOptions;
