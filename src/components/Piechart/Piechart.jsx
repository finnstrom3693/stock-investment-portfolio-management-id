import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the Chart.js datalabels plugin
import Chart from 'chart.js/auto'; // Import Chart.js to enable auto-loading of Chart.js plugins
import "./Piechart.css"

Chart.register(ChartDataLabels);

const Piechart = () => {
  // State to store stock data
  const [stockData, setStockData] = useState([]);

  // Effect to load stock data from local storage
  useEffect(() => {
    const savedStockData = localStorage.getItem('stocks');
    if (savedStockData) {
      setStockData(JSON.parse(savedStockData));
    }
  }, []);

  // Calculate total investment amount and total shares
  let totalInvestment = 0;
  let totalShares = 0;
  const sectorData = {};
  const sectorData2 = {};
  stockData.forEach((stock) => {
    totalInvestment += parseFloat(stock.amountInvested);
    totalShares += parseFloat(stock.amountShares);
    // Aggregate sector data
    if (sectorData[stock.sector]) {
      sectorData[stock.sector] += parseFloat(stock.amountInvested);
    } else {
      sectorData[stock.sector] = parseFloat(stock.amountInvested);
    }
    if (sectorData2[stock.sector]) {
      sectorData2[stock.sector] += parseFloat(stock.amountShares);
    } else {
      sectorData2[stock.sector] = parseFloat(stock.amountShares);
    }
  });

  // Function to generate random color
  const generateRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

  // Prepare data for investment amount pie chart
  const investmentData = {
    labels: stockData.map((stock, index) => `${stock.stockIndex} (${((parseFloat(stock.amountInvested) / totalInvestment) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: 'Amount Investment',
        data: stockData.map(stock => parseFloat(stock.amountInvested)),
        backgroundColor: stockData.map(() => generateRandomColor()),
        hoverBackgroundColor: stockData.map(() => generateRandomColor()),
      },
    ],
  };

  // Prepare data for shares pie chart
  const sharesData = {
    labels: stockData.map((stock, index) => `${stock.stockIndex} (${((parseFloat(stock.amountShares) / totalShares) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: 'Amount Shares',
        data: stockData.map(stock => parseFloat(stock.amountShares)),
        backgroundColor: stockData.map(() => generateRandomColor()),
        hoverBackgroundColor: stockData.map(() => generateRandomColor()),
      },
    ],
  };

  // Prepare data for sector pie chart
  const sectorInvestChartData = {
    labels: Object.keys(sectorData).map(sector => `${sector} (${((parseFloat(sectorData[sector]) / totalInvestment) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: 'Sector Investment',
        data: Object.values(sectorData),
        backgroundColor: Object.keys(sectorData).map(() => generateRandomColor()),
        hoverBackgroundColor: Object.keys(sectorData).map(() => generateRandomColor()),
      },
    ],
  };

  const sectorShareChartData = {
    labels: Object.keys(sectorData).map(sector => `${sector} (${((parseFloat(sectorData2[sector]) / totalShares) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: 'Sector Shares',
        data: Object.values(sectorData2),
        backgroundColor: Object.keys(sectorData2).map(() => generateRandomColor()),
        hoverBackgroundColor: Object.keys(sectorData2).map(() => generateRandomColor()),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false // Display legend if not on mobile
      }
    }
  };

  // Determine if it's a mobile device
  const isMobileDevice = window.innerWidth <= 768;

  return (
    <div>
      <Link to="/" className="btn btn-primary mx-2 my-2">
        Back to Home
      </Link>
      <br /><br />
      <center>
      <h2 className='text-center my-2'>Amount Investment</h2>
      <div className='container piecon'>
        <Pie data={investmentData} options={isMobileDevice ? chartOptions : {}} />
      </div>
      <h2 className='text-center my-2'>Amount Shares</h2>
      <div className='container piecon'>
        <Pie data={sharesData} options={isMobileDevice ? chartOptions : {}} />
      </div>
      <h2 className='text-center my-2'>Sector Investment</h2>
      <div className='container piecon' >
        <Pie data={sectorInvestChartData} options={isMobileDevice ? chartOptions : {}} />
      </div>
      <h2 className='text-center my-2'>Sector Shares</h2>
      <div className='container piecon'>
        <Pie data={sectorShareChartData} options={isMobileDevice ? chartOptions : {}} />
      </div>
      </center>
    </div>
  );
};

export default Piechart;
