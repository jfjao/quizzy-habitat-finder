
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import QuestionnaireFlow from '../components/questionnaire/QuestionnaireFlow';
import { QuestionnaireProvider, useQuestionnaire } from '../components/questionnaire/QuestionnaireContext';

// Component to update title based on chosen path
const DynamicTitle = () => {
  const { answers } = useQuestionnaire();
  
  // Set title based on user's chosen path
  const getTitle = () => {
    if (!answers[1]) {
      return "Trouvez votre bien idéal à Madagascar";
    }
    
    switch (answers[1]) {
      case "acheter":
        return "Trouvez le bien parfait à acheter à Madagascar";
      case "louer":
        return "Trouvez la location idéale à Madagascar";
      case "vendre":
        return "Vendez votre bien immobilier à Madagascar";
      default:
        return "Trouvez votre bien idéal à Madagascar";
    }
  };
  
  // Set description based on user's chosen path
  const getDescription = () => {
    if (!answers[1]) {
      return "Répondez à quelques questions pour nous aider à comprendre vos besoins et vous trouver les biens parfaitement adaptés au marché malgache.";
    }
    
    switch (answers[1]) {
      case "acheter":
        return "Nous allons vous aider à trouver le bien qui correspond à vos critères et à votre budget pour un achat en toute confiance.";
      case "louer":
        return "Trouvez rapidement la location qui vous convient, selon vos critères et votre budget mensuel.";
      case "vendre":
        return "Optimisez la vente de votre bien avec notre accompagnement personnalisé pour une transaction réussie.";
      default:
        return "Répondez à quelques questions pour nous aider à comprendre vos besoins et vous trouver les biens parfaitement adaptés au marché malgache.";
    }
  };
  
  // Generate gradient class based on path
  const getTitleGradient = () => {
    if (!answers[1]) return "from-primary to-primary/70";
    
    switch (answers[1]) {
      case "acheter":
        return "from-primary to-blue-400";
      case "louer":
        return "from-indigo-500 to-purple-400";
      case "vendre":
        return "from-amber-500 to-orange-400";
      default:
        return "from-primary to-primary/70";
    }
  };
  
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className={`mb-4 text-3xl font-medium md:text-4xl bg-clip-text text-transparent bg-gradient-to-r ${getTitleGradient()} animate-pulse-soft`}>
        {getTitle()}
      </h1>
      <p className="text-muted-foreground transition-all duration-700">
        {getDescription()}
      </p>
    </div>
  );
};

// QuestionnaireContent component that uses the context
const QuestionnaireContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/70">
      <Navbar />
      
      <main className="pt-20 animate-fade-in">
        <div className="container mx-auto px-4 py-10">
          <DynamicTitle />
          
          <div className="mt-10">
            <QuestionnaireFlow />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Main component that provides the context
const Questionnaire = () => {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContent />
    </QuestionnaireProvider>
  );
};

export default Questionnaire;
