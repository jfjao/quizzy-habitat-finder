import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin } from 'lucide-react';
import { PropertyType } from '../components/properties/PropertyCard';
import AlertForm from '../components/alerts/AlertForm';
import { toast } from 'sonner';
import { Layout } from '../components/layout/Layout';
import { formatAriary } from '../utils/formatters';
import VisitScheduler from '../components/visits/VisitScheduler';

const allProperties = [
  {
    id: 1,
    title: "Appartement lumineux avec terrasse",
    type: "Appartement",
    location: "Paris, 11ème",
    price: 450000000,
    area: 65,
    rooms: 3,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Superbe appartement baigné de lumière avec une terrasse de 15m². Parfaitement situé dans un quartier vivant à proximité des commerces, transports et espaces verts. Comprend un salon spacieux, une cuisine équipée, 2 chambres et une salle de bain moderne. Faibles charges et bien entretenu.",
    features: ["Terrasse", "Proche métro", "Cuisine équipée", "Ascenseur", "Parking"]
  },
  {
    id: 2,
    title: "Maison de ville avec jardin",
    type: "Maison",
    location: "Lyon, 5ème",
    price: 620000000,
    area: 120,
    rooms: 5,
    bathrooms: 2,
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Charmante maison de ville avec jardin privatif de 80m². Située dans un environnement calme et résidentiel, à proximité des écoles et commerces. La maison dispose d'un séjour double, d'une cuisine séparée, de 3 chambres, un bureau et 2 salles de bain. Garage et cave inclus.",
    features: ["Jardin", "Garage", "Cave", "Double vitrage", "Cheminée"]
  },
  {
    id: 3,
    title: "Loft dans ancien atelier",
    type: "Loft",
    location: "Bordeaux Centre",
    price: 380000000,
    area: 85,
    rooms: 2,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Magnifique loft aménagé dans un ancien atelier industriel, alliant le charme de l'ancien et le confort moderne. Grands volumes avec une hauteur sous plafond de 4m, poutres apparentes et verrière d'artiste. Espace de vie de 60m² ouvert avec cuisine équipée, une chambre en mezzanine et une salle d'eau design.",
    features: ["Hauteur sous plafond", "Mezzanine", "Verrière", "Poutres apparentes", "Calme"]
  },
  {
    id: 4,
    title: "Appartement rénové proche métro",
    type: "Appartement",
    location: "Paris, 9ème",
    price: 520000000,
    area: 75,
    rooms: 3,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Bel appartement entièrement rénové par architecte, situé à 2 minutes du métro. Prestations haut de gamme avec matériaux nobles. Séjour lumineux avec cuisine américaine équipée, 2 chambres avec rangements, salle de bain avec douche à l'italienne. Faibles charges, immeuble bien entretenu avec gardien.",
    features: ["Rénové", "Proche métro", "Cuisine américaine", "Dressing", "Gardien"]
  },
  {
    id: 5,
    title: "Duplex avec vue panoramique",
    type: "Appartement",
    location: "Marseille, 7ème",
    price: 420000000,
    area: 90,
    rooms: 4,
    bathrooms: 2,
    imageUrl: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Superbe duplex offrant une vue panoramique sur la mer et les îles du Frioul. Au premier niveau: vaste séjour lumineux avec cuisine ouverte donnant sur balcon, 2 chambres et salle d'eau. À l'étage: suite parentale avec dressing et salle de bain. Parfait état, vue imprenable, proche des plages.",
    features: ["Vue mer", "Duplex", "Balcon", "Suite parentale", "Proche plages"]
  },
  {
    id: 6,
    title: "Studio étudiant rénové",
    type: "Studio",
    location: "Lyon, 8ème",
    price: 120000000,
    area: 28,
    rooms: 1,
    bathrooms: 1,
    imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Studio idéal pour étudiant ou investissement locatif, entièrement rénové avec goût. Pièce de vie lumineuse avec cuisine équipée, salle d'eau moderne avec douche à l'italienne. Nombreux rangements optimisant l'espace. Situé à 5 min à pied du campus universitaire et des commerces.",
    features: ["Rénové", "Meublé", "Proche université", "Faibles charges", "Bon rendement locatif"]
  }
];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const foundProperty = allProperties.find(p => p.id === Number(id));
      setProperty(foundProperty || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const handleShare = () => {
    toast.success("Lien copié dans le presse-papier!");
  };

  if (isLoading) {
    return (
      <Layout>
        <main className="pt-20">
          <div className="container mx-auto flex h-96 items-center justify-center px-4">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          </div>
        </main>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <main className="pt-20">
          <div className="container mx-auto px-4 py-10">
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <h2 className="mb-4 text-2xl font-medium">Bien non trouvé</h2>
              <p className="mb-6 text-muted-foreground">
                Le bien que vous recherchez n'existe pas ou a été retiré.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  const { title, type, location, price, area, rooms, bathrooms, imageUrl, description, features } = property;

  return (
    <Layout>
      <main className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-6 flex items-center">
            <Link 
              to="/results" 
              className="mr-4 flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux résultats
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                    {type}
                  </span>
                  <h1 className="mt-2 text-2xl font-medium md:text-3xl">{title}</h1>
                  <div className="mt-1 flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{location}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-medium text-primary">{formatAriary(price)}</div>
                  <div className="text-sm text-muted-foreground">soit {formatAriary(Math.round(price/area))}/m²</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-border bg-secondary/30 p-4">
                <div className="text-center">
                  <div className="text-lg font-medium">{area} m²</div>
                  <div className="text-xs text-muted-foreground">Surface</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">{rooms}</div>
                  <div className="text-xs text-muted-foreground">Pièces</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">{bathrooms}</div>
                  <div className="text-xs text-muted-foreground">Salle(s) de bain</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-medium">Description</h2>
                <p className="text-muted-foreground">{description}</p>
              </div>
              
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-medium">Caractéristiques</h2>
                <div className="flex flex-wrap gap-2">
                  {features?.map((feature, index) => (
                    <span 
                      key={index} 
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-medium">Contact</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium">
                        Nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        placeholder="Votre email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                        Téléphone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="mb-1 block text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        placeholder="Votre message"
                        defaultValue={`Bonjour, je suis intéressé(e) par ce bien: ${title} à ${location}.`}
                      />
                    </div>
                    
                    <button
                      type="button"
                      className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-md"
                      onClick={() => toast.success("Votre message a été envoyé !")}
                    >
                      Contacter l'agence
                    </button>
                  </form>
                  
                  {property && <VisitScheduler property={property} />}
                  
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <button
                      onClick={handleFavoriteToggle}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        isFavorite ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                      {isFavorite ? 'Sauvegardé' : 'Sauvegarder'}
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground"
                    >
                      <Share2 className="h-4 w-4" />
                      Partager
                    </button>
                  </div>
                </div>
                
                <AlertForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PropertyDetail;
