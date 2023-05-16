import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const WordFrequencyAnalyzer = () => {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('https://www.terriblytinytales.com/test.txt');
    const text = response.data;
    const words = text.split(/\s+/);

    const wordFrequency = {};
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    const sortedWords = Object.keys(wordFrequency).sort(
      (a, b) => wordFrequency[b] - wordFrequency[a]
    );

    const topWords = sortedWords.slice(0, 20);

    const chartData = topWords.map((word) => ({
      word,
      frequency: wordFrequency[word],
    }));

    setChartData(chartData);
  };

  const handleExport = () => {
    if (chartData.length === 0) return;

    const csvContent = `Word,Frequency\n${chartData
      .map(({ word, frequency }) => `${word},${frequency}`)
      .join('\n')}`;

    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = 'tttword_frequency.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={fetchData}>
          Submit
        </button>
      </div>
      {chartData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center">Words Frequency Historam</h2>
          <div className="chart-container">
            <BarChart width={600} height={500} data={chartData} margin={{ bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="word" angle={-45} textAnchor="end" interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="frequency"
                fill="#5E81AC"
                shape={<CustomBar />}
                label={<LabelPositioned />}
              />
            </BarChart>
          </div>
        </div>
      )}
      {chartData.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-secondary" onClick={handleExport}>
            Export
          </button>
        </div>
      )}
    </div>
  );
};

const CustomBar = ({ fill, x, y, width, height }) => (
  <g>
    <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#8884d8" strokeWidth={2} />
  </g>
);

const LabelPositioned = ({ x, y, width, value }) => {
  const xPos = x + width / 2;
  const yPos = y -8;
  const textAnchor = "middle";
  return (
    <text x={xPos} y={yPos} fill="#333" textAnchor={textAnchor} dominantBaseline="middle">
      {value}
    </text>
  );
};

export default WordFrequencyAnalyzer;
