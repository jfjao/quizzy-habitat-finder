
import React from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './data';
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
      
      // Special case for first question - show a different toast based on selection
      if (question.id === 1) {
        let message = "";
        let toastType: "success" | "info" | "warning" = "success";
        
        switch (optionId) {
          case "acheter":
            message = "Trouvons votre bien idéal à acheter";
            toastType = "success";
            break;
          case "louer":
            message = "Cherchons votre location idéale";
            toastType = "info";
            break;
          case "vendre":
            message = "Préparons la vente de votre bien";
            toastType = "warning";
            break;
          default:
            message = `Vous avez choisi: ${question.options.find(o => o.id === optionId)?.label}`;
        }
        
        toast[toastType](message, {
          icon: question.options.find(o => o.id === optionId)?.icon,
          duration: 2000,
        });
      } else {
        // Regular toast for other single-select questions
        const selectedLabel = question.options.find(o => o.id === optionId)?.label;
        toast.success(`Vous avez choisi: ${selectedLabel}`, {
          icon: question.options.find(o => o.id === optionId)?.icon,
        });
      }
      
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

  // Direction-based animation classes
  const getTransitionClass = () => {
    if (direction === 'forward') {
      return 'translate-x-0 opacity-100';
    } else {
      return '-translate-x-10 opacity-0';
    }
  };
  
  // Get different styling based on the user's chosen path (buy, sell, rent)
  const getOptionStyles = (optionId: string) => {
    const isSelected = isOptionSelected(optionId);
    let pathSpecificClass = '';
    
    // Only apply path-specific styling after question 1
    if (answers[1] && currentQuestion.id > 1) {
      switch(answers[1]) {
        case 'acheter':
          pathSpecificClass = isSelected ? 'border-primary bg-primary/10' : 'hover:border-primary/50 hover:bg-primary/5';
          break;
        case 'louer':
          pathSpecificClass = isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'hover:border-indigo-500/50 hover:bg-indigo-500/5';
          break;
        case 'vendre':
          pathSpecificClass = isSelected ? 'border-amber-500 bg-amber-500/10' : 'hover:border-amber-500/50 hover:bg-amber-500/5';
          break;
        default:
          pathSpecificClass = isSelected ? 'border-primary bg-primary/10' : 'hover:border-primary/50 hover:bg-secondary/80';
      }
    } else {
      // Default styling for question 1
      pathSpecificClass = isSelected ? 'border-primary bg-primary/10' : 'hover:border-primary/50 hover:bg-secondary/80';
    }
    
    return `
      flex flex-col items-center justify-center rounded-xl border border-border p-6 text-center 
      transition-all duration-300 hover-lift backdrop-blur-sm
      ${pathSpecificClass} ${isSelected ? 'shadow-lg transform scale-105' : 'hover:scale-105'}
      animate-fade-in
    `;
  };
  
  // Get icon color based on path
  const getIconColor = (optionId: string) => {
    const isSelected = isOptionSelected(optionId);
    
    if (!isSelected) return "text-muted-foreground";
    
    // Apply different colors based on path
    if (answers[1] && currentQuestion.id > 1) {
      switch(answers[1]) {
        case 'acheter': return 'text-primary';
        case 'louer': return 'text-indigo-500';
        case 'vendre': return 'text-amber-500';
        default: return 'text-primary';
      }
    }
    
    return 'text-primary';
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
            className={getOptionStyles(option.id)}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transform: isOptionSelected(option.id) ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {option.icon && (
              <div className={`mb-3 transition-all duration-300 ${
                getIconColor(option.id)
              } ${isOptionSelected(option.id) ? 'scale-125 transform animate-pulse-soft' : ''}`}>
                {option.icon}
              </div>
            )}
            <span className={`font-medium transition-all duration-300 ${
              getIconColor(option.id)
            }`}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionOptions;
