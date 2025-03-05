
import React from 'react';
import Hero from '../components/home/Hero';
import PropertyList from '../components/properties/PropertyList';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Données fictives pour les propriétés en vedette
const featuredProperties = [
  {
    id: 1,
    title: "Appartement lumineux avec balcon",
    type: "Appartement",
    location: "Antananarivo, Ivandry",
    price: 450000000,
    area: 65,
    rooms: 3,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Villa avec jardin",
    type: "Villa",
    location: "Antananarivo, Ambatobe",
    price: 620000000,
    area: 120,
    rooms: 5,
    bathrooms: 2,
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Bungalow près de la plage",
    type: "Maison",
    location: "Nosy Be, Ambatoloaka",
    price: 380000000,
    area: 85,
    rooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const Index = () => {
  return (
    <Layout>
      <main className="pt-16">
        <Hero />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-medium md:text-3xl">Biens en vedette</h2>
                <p className="mt-2 text-muted-foreground">Découvrez nos propriétés coup de cœur à Madagascar</p>
              </div>
              
              <Link 
                to="/questionnaire" 
                className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm font-medium transition-all hover:bg-secondary/80"
              >
                Voir plus
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <PropertyList properties={featuredProperties} showEmptyState={false} />
          </div>
        </section>
        
        <section className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                Notre approche
              </span>
              
              <h2 className="mb-6 text-2xl font-medium md:text-3xl">
                Une nouvelle façon de trouver votre bien immobilier à Madagascar
              </h2>
              
              <p className="mb-10 text-muted-foreground">
                Notre questionnaire interactif analyse vos besoins réels pour vous faire gagner du temps 
                et vous proposer uniquement les biens qui correspondent vraiment à vos attentes sur le marché malgache.
              </p>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-semibold text-primary">1</span>
                  </div>
                  <h3 className="mb-2 font-medium">Questionnaire ludique</h3>
                  <p className="text-sm text-muted-foreground">
                    Répondez à quelques questions simples sur vos préférences et vos besoins.
                  </p>
                </div>
                
                <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-semibold text-primary">2</span>
                  </div>
                  <h3 className="mb-2 font-medium">Analyse intelligente</h3>
                  <p className="text-sm text-muted-foreground">
                    Notre algorithme trouve les biens qui correspondent le mieux à votre profil.
                  </p>
                </div>
                
                <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-semibold text-primary">3</span>
                  </div>
                  <h3 className="mb-2 font-medium">Alertes personnalisées</h3>
                  <p className="text-sm text-muted-foreground">
                    Soyez informé dès qu'un bien correspondant à vos critères devient disponible.
                  </p>
                </div>
              </div>
              
              <div className="mt-10">
                <Link
                  to="/questionnaire"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg"
                >
                  Commencer ma recherche
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;
