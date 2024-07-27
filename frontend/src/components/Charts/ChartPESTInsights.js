import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import './ChartPESTInsights.css';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartPESTInsights = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                const insights = response.data;

                if (insights && Array.isArray(insights)) {
                    const pestleCategories = [...new Set(insights.map(insight => insight.pestle))];
                    const pestleCounts = pestleCategories.map(category => {
                        return insights.filter(insight => insight.pestle === category).length;
                    });

                    setData({
                        labels: pestleCategories,
                        datasets: [
                            {
                                label: 'PEST-wise Insights',
                                data: pestleCounts,
                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            }
                        ]
                    });
                } else {
                    throw new Error('Unexpected data format');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='grid-one-item grid-common grid-c3'>
            <div className='grid-c-title'>
                <h3 className='grid-c-title-text'>PEST-wise Insights</h3>
                <button className='grid-c-title-icon'>
                    <FontAwesomeIcon icon={faChartBar} />
                </button>
            </div>
            <div className='chart-grid-item'>
                <Bar data={data} />
            </div>
        </div>
    );
};

export default ChartPESTInsights;
