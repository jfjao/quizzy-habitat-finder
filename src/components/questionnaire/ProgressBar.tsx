
import React, { useMemo } from 'react';
import { useQuestionnaire } from './QuestionnaireContext';
import { questions } from './data';
import { shouldShowQuestion } from './services/navigationService';

const ProgressBar = () => {
  const { currentQuestionIndex, answers } = useQuestionnaire();
  
  // Calculate visible questions based on current answers
  const visibleQuestions = useMemo(() => {
    // Pour la première question, nous devons calculer différemment
    if (currentQuestionIndex === 0) {
      // Estimer le nombre total de questions basé sur le chemin "acheter" (par défaut)
      // Car l'utilisateur n'a pas encore fait de sélection
      let estimatedTotal = questions.filter(q => 
        !q.showIf || 
        (typeof q.showIf === 'object' && 'questionId' in q.showIf && q.showIf.questionId === 1 && q.showIf.value === "acheter") ||
        (Array.isArray(q.showIf) && q.showIf.some(cond => cond.questionId === 1 && cond.value === "acheter"))
      );
      
      return [questions[0], ...estimatedTotal.filter(q => q.id !== 1)];
    }
    
    // Après la première question, calculer en fonction du choix de l'utilisateur
    return questions.filter(question => shouldShowQuestion(question, answers));
  }, [answers, currentQuestionIndex]);
  
  // Trouver l'index de la question actuelle dans le tableau des questions visibles
  const currentVisibleIndex = visibleQuestions.findIndex(q => q.id === questions[currentQuestionIndex].id);
  
  // Calculer le nombre total de questions visibles en fonction du chemin sélectionné
  const totalVisibleQuestions = visibleQuestions.length;
  
  // Calculer le pourcentage de progression
  const progress = totalVisibleQuestions > 0 
    ? ((currentVisibleIndex + 1) / totalVisibleQuestions) * 100 
    : 0;

  // Formater pour l'affichage
  const questionNumber = currentVisibleIndex + 1;
  const totalQuestions = totalVisibleQuestions;
  
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Question {questionNumber}/{totalQuestions > 1 ? totalQuestions : '?'}
        </span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${currentQuestionIndex === 0 ? 10 : progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
