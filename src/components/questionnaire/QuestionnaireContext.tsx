
import React, { createContext, useContext, useState } from 'react';

// Types for questions
export type QuestionType = {
  id: number;
  question: string;
  options: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  multiSelect?: boolean;
};

// Types for answers
export type AnswersType = {
  [key: number]: string[] | string;
};

// Context type
type QuestionnaireContextType = {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  answers: AnswersType;
  setAnswers: React.Dispatch<React.SetStateAction<AnswersType>>;
  direction: 'forward' | 'backward';
  setDirection: React.Dispatch<React.SetStateAction<'forward' | 'backward'>>;
};

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  return (
    <QuestionnaireContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        direction,
        setDirection,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};
