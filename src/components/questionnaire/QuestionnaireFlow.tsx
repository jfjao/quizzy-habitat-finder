
import React from 'react';
import { QuestionnaireProvider } from './QuestionnaireContext';
import ProgressBar from './ProgressBar';
import QuestionOptions from './QuestionOptions';
import NavigationButtons from './NavigationButtons';

const QuestionnaireFlow = () => {
  return (
    <QuestionnaireProvider>
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl">
          <ProgressBar />
          <QuestionOptions />
          <NavigationButtons />
        </div>
      </div>
    </QuestionnaireProvider>
  );
};

export default QuestionnaireFlow;
