import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../api';
import './ChartRegionInsights.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

// Register necessary chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartRegionInsights = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'Region-wise Insights',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                const insights = response.data;
                
                // Log the API response for debugging
                console.log('API Response:', insights);

                // Ensure insights is an array
                if (!Array.isArray(insights)) {
                    throw new Error('API response is not an array');
                }

                const regions = [...new Set(insights.map(insight => insight.region))];
                const regionCounts = regions.map(region => {
                    return insights.filter(insight => insight.region === region).length;
                });

                // Update state with fetched data
                setData({
                    labels: regions,
                    datasets: [
                        {
                            label: 'Region-wise Insights',
                            data: regionCounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        }
                    ]
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid-one-item grid-common grid-c4">
            <div className='grid-c-title'>
                <h3 className='grid-c-title-text'>Region-wise Insights</h3>
                <button className='grid-c-title-icon'>
                    <FontAwesomeIcon icon={faChartBar} />
                </button>
            </div>
            <div className='chart-grid-item'>
            {data.labels.length > 0 && data.datasets.length > 0 ? (
                <Bar data={data} />
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
};

export default ChartRegionInsights;
