import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../api';
import './ChartSectorInsights.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

const ChartSectorInsights = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                const insights = response.data;

                if (Array.isArray(insights)) {
                    const sectors = [...new Set(insights.map(insight => insight.sector))];
                    const sectorCounts = sectors.map(sector => {
                        return insights.filter(insight => insight.sector === sector).length;
                    });

                    setData({
                        labels: sectors,
                        datasets: [
                            {
                                label: 'Sector-wise Insights',
                                data: sectorCounts,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            }
                        ]
                    });
                } else {
                    console.error('Expected an array for insights but got:', insights);
                    setError('Unexpected data format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
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
        <div className='grid-one-item grid-common grid-c6'>
            <div className='grid-c-title'>
                <h3 className='grid-c-title-text'>Sector wise Insights</h3>
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

export default ChartSectorInsights;
