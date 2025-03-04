
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import QuestionnaireFlow from '../components/questionnaire/QuestionnaireFlow';

const Questionnaire = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      
      <main className="pt-20 animate-fade-in">
        <div className="container mx-auto px-4 py-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-medium md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Trouvez votre bien idéal à Madagascar
            </h1>
            <p className="text-muted-foreground">
              Répondez à quelques questions pour nous aider à comprendre vos besoins et vous trouver 
              les biens parfaitement adaptés au marché malgache.
            </p>
          </div>
          
          <div className="mt-10">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-border/40">
              <QuestionnaireFlow />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Questionnaire;
