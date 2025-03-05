
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartLine } from 'lucide-react';
import { getMockPriceHistory } from '@/data/mockPriceData';

interface PriceHistoryChartProps {
  timeFrame: string;
  propertyType: string;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ timeFrame, propertyType }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simuler un chargement de données
    setTimeout(() => {
      setData(getMockPriceHistory(timeFrame, propertyType));
      setIsLoading(false);
    }, 800);
  }, [timeFrame, propertyType]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <ChartLine className="h-12 w-12 text-muted" />
          <p className="mt-2 text-sm text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          stroke="#9ca3af"
        />
        <YAxis 
          tickFormatter={(value) => `${value.toLocaleString('fr-FR')} €`} 
          tick={{ fontSize: 12 }}
          stroke="#9ca3af"
          width={80}
        />
        <RechartsTooltip 
          formatter={(value, name) => [`${value.toLocaleString('fr-FR')} €`, name]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        <Line
          name="Prix moyen au m²"
          type="monotone"
          dataKey="price"
          stroke="#1e40af"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line 
          name="Tendance"
          type="monotone" 
          dataKey="trend" 
          stroke="#6b7280" 
          strokeDasharray="5 5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
