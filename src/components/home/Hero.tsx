
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 pt-20 text-center">
        <div className="animate-fade-in">
          <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            Une nouvelle approche immobilière à Madagascar
          </span>
          
          <h1 className="mb-6 mt-4 text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
            Trouvez le bien qui vous correspond{" "}
            <span className="animate-pulse-soft">vraiment</span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Notre questionnaire personnalisé analyse vos besoins réels pour vous proposer 
            uniquement des biens qui correspondent à votre style de vie et vos aspirations sur le marché malgache.
          </p>
          
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to="/questionnaire"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg"
            >
              Commencer la recherche
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
            >
              En savoir plus
            </Link>
          </div>
        </div>
        
        <div className="mt-20 animate-float">
          <div className="glass overflow-hidden rounded-xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Interior of modern home"
              className="h-64 w-full object-cover object-center sm:h-80 md:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
