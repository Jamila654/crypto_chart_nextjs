import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { createChart, ISeriesApi, LineData, UTCTimestamp } from 'lightweight-charts';

interface CryptoChartProps {
  selectedPair: string;
}

interface ApiResponse {
  price: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ selectedPair }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ISeriesApi<'Line'> | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [cryptoName, setCryptoName] = useState<string>("");

  // Fetch the price and crypto name based on the selected pair
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://api.api-ninjas.com/v1/cryptoprice?symbol=${selectedPair}`,
          { headers: { 'X-Api-Key': 'lKtqOcitXKlPdf5kvf1ysg==AguhIHwYblypgdyF' } }
        );

        if (response.status === 200 && response.data.price) {
          const newPrice = parseFloat(response.data.price);
          setPrice(newPrice);

          const name = selectedPair.replace('USDT', '');
          setCryptoName(name);
          
          const timestamp = Math.floor(Date.now() / 1000) as UTCTimestamp;
          if (chartRef.current) {
            chartRef.current.update({ time: timestamp, value: newPrice });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData(); 
    const interval = setInterval(fetchCryptoData, 5000);

    return () => clearInterval(interval);
  }, [selectedPair]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: '#131722' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#2A2E39' },
        horzLines: { color: '#2A2E39' },
      },
      timeScale: { timeVisible: true, secondsVisible: true },
    });

    const lineSeries = chart.addLineSeries({
      color: '#2196f3',
      lineWidth: 2,
    });

    chartRef.current = lineSeries;

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#fff', fontSize: '2rem', margin: '20px 0' }}>
        {cryptoName} {price ? price.toLocaleString() : 'Loading...'}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
        <div ref={chartContainerRef} style={{ width: '90%', height: '500px' }} />
      </div>
    </div>
  );
};

export default CryptoChart;
