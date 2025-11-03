import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProteinChartData {
  name: string;
  target: number;
  consumed: number;
}

interface ProteinChartProps {
  data: ProteinChartData[];
}

const ProteinChart: React.FC<ProteinChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
        <XAxis dataKey="name" stroke="#64748b"/>
        <YAxis stroke="#64748b"/>
        <Tooltip 
            contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
            }}
        />
        <Legend />
        <Bar dataKey="target" fill="#fca5a5" name="Target" radius={[4, 4, 0, 0]} />
        <Bar dataKey="consumed" fill="#ef4444" name="Consumed" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProteinChart;