
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CaloriesChartData {
  name: string;
  target: number;
  consumed: number;
}

interface CaloriesChartProps {
  data: CaloriesChartData[];
}

const CaloriesChart: React.FC<CaloriesChartProps> = ({ data }) => {
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
        <Bar dataKey="target" fill="#a5b4fc" name="Target" radius={[4, 4, 0, 0]} />
        <Bar dataKey="consumed" fill="#4f46e5" name="Consumed" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CaloriesChart;
