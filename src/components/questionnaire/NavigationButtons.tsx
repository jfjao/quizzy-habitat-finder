
import React from 'react';
import BackButton from './buttons/BackButton';
import NextButton from './buttons/NextButton';
import { useNavigation } from './hooks/useNavigation';

const NavigationButtons = () => {
  const { 
    handleNextQuestion, 
    handlePreviousQuestion, 
    isAtFirstQuestion,
    isAtLastQuestion
  } = useNavigation();

  return (
    <div className="mt-10 flex items-center justify-between">
      <BackButton 
        onClick={handlePreviousQuestion} 
        disabled={isAtFirstQuestion} 
      />
      
      <NextButton 
        onClick={handleNextQuestion} 
        isLastQuestion={isAtLastQuestion} 
      />
    </div>
  );
};

export default NavigationButtons;
