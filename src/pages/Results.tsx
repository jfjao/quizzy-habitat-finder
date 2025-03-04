
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PropertyList from '../components/properties/PropertyList';
import AlertForm from '../components/alerts/AlertForm';
import { PropertyType } from '../components/properties/PropertyCard';
import { ArrowLeft } from 'lucide-react';

// Données fictives pour simuler une API
const allProperties = [
  {
    id: 1,
    title: "Appartement lumineux avec terrasse",
    type: "Appartement",
    location: "Paris, 11ème",
    price: 450000,
    area: 65,
    rooms: 3,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Maison de ville avec jardin",
    type: "Maison",
    location: "Lyon, 5ème",
    price: 620000,
    area: 120,
    rooms: 5,
    bathrooms: 2,
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Loft dans ancien atelier",
    type: "Loft",
    location: "Bordeaux Centre",
    price: 380000,
    area: 85,
    rooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "Appartement rénové proche métro",
    type: "Appartement",
    location: "Paris, 9ème",
    price: 520000,
    area: 75,
    rooms: 3,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 5,
    title: "Duplex avec vue panoramique",
    type: "Appartement",
    location: "Marseille, 7ème",
    price: 420000,
    area: 90,
    rooms: 4,
    bathrooms: 2,
    imageUrl: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    title: "Studio étudiant rénové",
    type: "Studio",
    location: "Lyon, 8ème",
    price: 120000,
    area: 28,
    rooms: 1,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const Results = () => {
  const location = useLocation();
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const answers = location.state?.answers || {};
  
  useEffect(() => {
    // Simuler le chargement depuis une API
    setIsLoading(true);
    
    setTimeout(() => {
      // Filtrer les propriétés en fonction des réponses
      // C'est ici qu'on implémenterait une vraie logique de filtrage basée sur les réponses
      const typeAnswer = answers[2]; // Réponse à la question sur le type de bien
      const locationAnswer = answers[3]; // Réponse à la question sur la ville
      const budgetAnswer = answers[5]; // Réponse à la question sur le budget
      
      // Exemple très simple de filtrage
      let filtered = [...allProperties];
      
      // Exemple: Si aucun critère n'est sélectionné, retourner 0 résultat pour montrer l'état vide
      if (Object.keys(answers).length === 0) {
        filtered = [];
      }
      // Très simple filtrage basé sur une ville - juste pour l'exemple
      else if (locationAnswer === "paris") {
        filtered = allProperties.filter(p => p.location.toLowerCase().includes("paris"));
      }
      else if (locationAnswer === "lyon") {
        filtered = allProperties.filter(p => p.location.toLowerCase().includes("lyon"));
      } 
      else if (locationAnswer === "marseille") {
        filtered = allProperties.filter(p => p.location.toLowerCase().includes("marseille"));
      }
      else if (locationAnswer === "bordeaux") {
        filtered = allProperties.filter(p => p.location.toLowerCase().includes("bordeaux"));
      }
      
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 1500);
  }, [answers]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-10 flex items-center">
            <Link 
              to="/questionnaire" 
              className="mr-4 flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
            
            <h1 className="text-2xl font-medium md:text-3xl">Résultats de votre recherche</h1>
          </div>
          
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <PropertyList properties={filteredProperties} />
              </div>
              
              <div className="lg:col-span-1">
                <AlertForm criteria={answers} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
