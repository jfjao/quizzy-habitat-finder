
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import QuestionnaireFlow from '../components/questionnaire/QuestionnaireFlow';

const Questionnaire = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-medium md:text-4xl">Trouvez votre bien idéal</h1>
            <p className="text-muted-foreground">
              Répondez à quelques questions pour nous aider à comprendre vos besoins et vous trouver les biens parfaitement adaptés.
            </p>
          </div>
          
          <div className="mt-10">
            <QuestionnaireFlow />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Questionnaire;
