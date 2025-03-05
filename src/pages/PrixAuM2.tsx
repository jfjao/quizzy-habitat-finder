
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '@/components/layout/Layout';
import { NeighborhoodMap } from '@/components/prixaum2/NeighborhoodMap';
import { PriceHistoryChart } from '@/components/prixaum2/PriceHistoryChart';
import { ActiveNeighborhoodsTable } from '@/components/prixaum2/ActiveNeighborhoodsTable';
import { PropertyTypeFilter } from '@/components/prixaum2/PropertyTypeFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const propertyTypes = [
  { id: 'all', label: 'Tous les biens' },
  { id: 'apartment', label: 'Appartements' },
  { id: 'house', label: 'Maisons' },
  { id: 'villa', label: 'Villas' },
  { id: 'land', label: 'Terrains' }
];

const timeFrames = [
  { id: '6m', label: '6 mois' },
  { id: '1y', label: '1 an' },
  { id: '5y', label: '5 ans' }
];

export default function PrixAuM2() {
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1y');

  return (
    <>
      <Helmet>
        <title>Prix au m² | Trano Tsara</title>
        <meta name="description" content="Découvrez les prix au mètre carré par quartier et suivez les tendances du marché immobilier." />
      </Helmet>
      
      <Layout>
        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-3xl font-bold mb-8">Prix au m²</h1>
          
          <div className="mb-6">
            <PropertyTypeFilter 
              propertyTypes={propertyTypes} 
              selectedType={selectedPropertyType} 
              onChange={setSelectedPropertyType} 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 h-[400px]">
              <Card className="h-full">
                <div className="p-4 h-full">
                  <h2 className="text-xl font-semibold mb-4">Carte des quartiers</h2>
                  <NeighborhoodMap propertyType={selectedPropertyType} />
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="h-full">
                <div className="p-4 h-full">
                  <h2 className="text-xl font-semibold mb-4">Quartiers les plus actifs</h2>
                  <ActiveNeighborhoodsTable propertyType={selectedPropertyType} />
                </div>
              </Card>
            </div>
          </div>
          
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Évolution des prix</h2>
                <div>
                  <Tabs 
                    value={selectedTimeFrame} 
                    onValueChange={setSelectedTimeFrame}
                  >
                    <TabsList>
                      {timeFrames.map(frame => (
                        <TabsTrigger key={frame.id} value={frame.id}>
                          {frame.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <div className="h-[350px]">
                <PriceHistoryChart timeFrame={selectedTimeFrame} propertyType={selectedPropertyType} />
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}
