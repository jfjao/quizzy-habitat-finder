
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Building } from 'lucide-react';
import { getMockActiveNeighborhoods } from '@/data/mockPriceData';

interface ActiveNeighborhoodsTableProps {
  propertyType: string;
}

interface Neighborhood {
  id: string;
  name: string;
  transactions: number;
  pricePerSqm: number;
  trend: 'up' | 'down' | 'stable';
}

export const ActiveNeighborhoodsTable: React.FC<ActiveNeighborhoodsTableProps> = ({ propertyType }) => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('transactions');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    setIsLoading(true);
    // Simuler un chargement de données
    setTimeout(() => {
      setNeighborhoods(getMockActiveNeighborhoods(propertyType));
      setIsLoading(false);
    }, 700);
  }, [propertyType]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const sortedNeighborhoods = [...neighborhoods].sort((a, b) => {
    const factor = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name) * factor;
    }
    return (a[sortBy as keyof Neighborhood] as number - (b[sortBy as keyof Neighborhood] as number)) * factor;
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Building className="h-10 w-10 text-muted" />
          <p className="mt-2 text-sm text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto max-h-[320px]">
      <table className="w-full border-collapse">
        <thead className="bg-muted/30">
          <tr>
            <th 
              className="px-3 py-2 text-left text-xs font-medium cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Quartier
                {sortBy === 'name' && (
                  sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </div>
            </th>
            <th 
              className="px-3 py-2 text-right text-xs font-medium cursor-pointer"
              onClick={() => handleSort('transactions')}
            >
              <div className="flex items-center justify-end">
                Transactions
                {sortBy === 'transactions' && (
                  sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </div>
            </th>
            <th 
              className="px-3 py-2 text-right text-xs font-medium cursor-pointer"
              onClick={() => handleSort('pricePerSqm')}
            >
              <div className="flex items-center justify-end">
                Prix/m²
                {sortBy === 'pricePerSqm' && (
                  sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedNeighborhoods.map((neighborhood) => (
            <tr key={neighborhood.id} className="border-b border-border last:border-0 hover:bg-muted/20">
              <td className="px-3 py-2 text-sm">{neighborhood.name}</td>
              <td className="px-3 py-2 text-sm text-right">{neighborhood.transactions}</td>
              <td className="px-3 py-2 text-sm text-right">
                <div className="flex items-center justify-end">
                  {neighborhood.pricePerSqm.toLocaleString('fr-FR')} €
                  {neighborhood.trend === 'up' && <ChevronUp className="h-3 w-3 ml-1 text-green-500" />}
                  {neighborhood.trend === 'down' && <ChevronDown className="h-3 w-3 ml-1 text-red-500" />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
