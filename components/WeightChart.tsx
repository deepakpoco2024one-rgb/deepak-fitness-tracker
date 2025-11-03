
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Day } from '../types';

interface WeightChartProps {
  data: Day[];
}

const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
  const chartData = data.map(day => ({
    name: day.dayOfWeek.substring(0, 3),
    weight: day.weight,
  }));
  
  const domainMin = Math.min(...data.map(d => d.weight || Infinity).filter(isFinite));
  const domainMax = Math.max(...data.map(d => d.weight || -Infinity).filter(isFinite));


  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" />
        <YAxis stroke="#64748b" domain={[Math.floor(domainMin - 2), Math.ceil(domainMax + 2)]} />
        <Tooltip
            contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
            }}
        />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightChart;
