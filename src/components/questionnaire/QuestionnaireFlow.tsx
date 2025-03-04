
import React, { useEffect, useState } from 'react';
import { QuestionnaireProvider, useQuestionnaire } from './QuestionnaireContext';
import ProgressBar from './ProgressBar';
import QuestionOptions from './QuestionOptions';
import NavigationButtons from './NavigationButtons';
import { questions } from './QuestionnaireData';

// Get background class based on selected path
const getBackgroundClass = (answers: any) => {
  if (!answers[1]) return "bg-card/50"; // Default
  
  switch (answers[1]) {
    case "acheter":
      return "bg-gradient-to-br from-card/50 to-primary/10";
    case "louer":
      return "bg-gradient-to-br from-card/50 to-secondary/20";
    case "vendre":
      return "bg-gradient-to-br from-card/50 to-warning/10";
    default:
      return "bg-card/50";
  }
};

const QuestionnaireContent = () => {
  const { answers } = useQuestionnaire();
  const [bgClass, setBgClass] = useState("bg-card/50");
  
  // Update background when path changes
  useEffect(() => {
    const newBgClass = getBackgroundClass(answers);
    setBgClass(newBgClass);
  }, [answers[1]]);
  
  return (
    <div className={`container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-10 transition-all duration-1000`}>
      <div className="w-full max-w-3xl">
        <ProgressBar />
        <QuestionOptions />
        <NavigationButtons />
      </div>
    </div>
  );
};

const QuestionnaireFlow = () => {
  const [containerClass, setContainerClass] = useState("bg-card/50");
  
  return (
    <QuestionnaireProvider>
      <div className={`${containerClass} backdrop-blur-sm rounded-xl shadow-lg p-6 border border-border/40 hover:shadow-xl transition-all duration-700`}>
        <QuestionnaireContent />
      </div>
    </QuestionnaireProvider>
  );
};

export default QuestionnaireFlow;
