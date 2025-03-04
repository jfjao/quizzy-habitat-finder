
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium">Trano Tsara</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Notre approche personnalisée vous permet de trouver le bien immobilier 
                qui correspond exactement à vos besoins à Madagascar à travers une expérience fluide et interactive.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wide">Services</h4>
            <ul className="flex flex-col space-y-3 text-sm">
              <li>
                <Link to="/questionnaire" className="text-muted-foreground transition-colors hover:text-foreground">
                  Recherche personnalisée
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Estimation de bien
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Conseils d'achat
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wide">Informations</h4>
            <ul className="flex flex-col space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Trano Tsara. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
