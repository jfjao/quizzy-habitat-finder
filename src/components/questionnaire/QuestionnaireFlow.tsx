
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  House, 
  Search, 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  Smile 
} from 'lucide-react';
import { toast } from "sonner";

// Types des questions
type QuestionType = {
  id: number;
  question: string;
  options: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  multiSelect?: boolean;
};

// Types des réponses
type AnswersType = {
  [key: number]: string[] | string;
};

const questions: QuestionType[] = [
  {
    id: 1,
    question: "Que recherchez-vous ?",
    options: [
      { id: "acheter", label: "Acheter", icon: <House className="h-6 w-6" /> },
      { id: "louer", label: "Louer", icon: <House className="h-6 w-6" /> },
      { id: "vendre", label: "Vendre", icon: <Search className="h-6 w-6" /> }
    ]
  },
  {
    id: 2,
    question: "Quel type de bien ?",
    options: [
      { id: "appartement", label: "Appartement" },
      { id: "maison", label: "Maison" },
      { id: "terrain", label: "Terrain" },
      { id: "local_commercial", label: "Local commercial" }
    ]
  },
  {
    id: 3,
    question: "Dans quelle ville ou région ?",
    options: [
      { id: "paris", label: "Paris" },
      { id: "lyon", label: "Lyon" },
      { id: "marseille", label: "Marseille" },
      { id: "bordeaux", label: "Bordeaux" },
      { id: "autre", label: "Autre" }
    ]
  },
  {
    id: 4,
    question: "Quels sont les critères importants pour vous ?",
    options: [
      { id: "balcon", label: "Balcon/Terrasse" },
      { id: "parking", label: "Parking" },
      { id: "metro", label: "Proche métro" },
      { id: "calme", label: "Environnement calme" },
      { id: "jardin", label: "Jardin" }
    ],
    multiSelect: true
  },
  {
    id: 5,
    question: "Quel est votre budget maximum ?",
    options: [
      { id: "100000", label: "< 100 000 €" },
      { id: "200000", label: "< 200 000 €" },
      { id: "300000", label: "< 300 000 €" },
      { id: "500000", label: "< 500 000 €" },
      { id: "1000000", label: "> 500 000 €" }
    ]
  }
];

const QuestionnaireFlow = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersType>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const handleOptionSelect = (optionId: string) => {
    const question = questions[currentQuestionIndex];
    
    // Gestion des questions à choix multiples
    if (question.multiSelect) {
      const currentAnswers = answers[question.id] as string[] || [];
      
      // Si l'option est déjà sélectionnée, la retirer, sinon l'ajouter
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      
      setAnswers({ ...answers, [question.id]: newAnswers });
    } else {
      // Pour les questions à choix unique, simplement remplacer la réponse
      setAnswers({ ...answers, [question.id]: optionId });
      
      // Passer automatiquement à la question suivante
      setTimeout(() => handleNextQuestion(), 400);
    }
  };

  const handleNextQuestion = () => {
    // Vérifier si une réponse a été donnée à la question actuelle
    const currentQuestionId = questions[currentQuestionIndex].id;
    const currentAnswer = answers[currentQuestionId];
    
    if (!currentAnswer && !questions[currentQuestionIndex].multiSelect) {
      toast.error("Veuillez sélectionner une option pour continuer");
      return;
    }
    
    if (questions[currentQuestionIndex].multiSelect && 
        (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0))) {
      toast.error("Veuillez sélectionner au moins une option pour continuer");
      return;
    }
    
    // Si c'est la dernière question, soumettre le formulaire
    if (currentQuestionIndex === questions.length - 1) {
      handleSubmit();
      return;
    }
    
    // Sinon, passer à la question suivante
    setDirection('forward');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection('backward');
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Simuler la recherche et redirection vers les résultats
    setTimeout(() => {
      navigate('/results', { state: { answers } });
    }, 500);
  };

  // Vérifie si l'option est sélectionnée
  const isOptionSelected = (optionId: string) => {
    const currentAnswers = answers[currentQuestion.id];
    
    if (Array.isArray(currentAnswers)) {
      return currentAnswers.includes(optionId);
    }
    
    return currentAnswers === optionId;
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Barre de progression */}
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
        
        {/* Conteneur de question avec animation */}
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
        
        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`
              flex items-center space-x-2 rounded-lg px-4 py-2 text-sm transition-all
              ${currentQuestionIndex === 0 
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:bg-secondary'}
            `}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Précédent</span>
          </button>
          
          <button
            onClick={handleNextQuestion}
            className="flex items-center space-x-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-md"
          >
            <span>{currentQuestionIndex === questions.length - 1 ? 'Voir les résultats' : 'Suivant'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireFlow;
