import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../api';
import './ChartInsightsByYear.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartInsightsByYear = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                const insights = response.data;
                if (!insights || !Array.isArray(insights)) {
                    throw new Error('Invalid data format');
                }
                const years = [...new Set(insights.map(insight => insight.start_year))].sort();
                const insightsByYear = years.map(year => {
                    return insights.filter(insight => insight.start_year === year).length;
                });

                setData({
                    labels: years,
                    datasets: [
                        {
                            label: 'Line Chart',
                            data: insightsByYear,
                            fill: false,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                        }
                    ]
                });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="grid-one-item grid-common grid-c1">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Insights By Year</h3>
                <button className="grid-c-title-icon">
                    <FontAwesomeIcon icon={faChartLine} />
                </button>
            </div>
            <div className="chart-grid-item">
                {data.labels && data.datasets ? <Line data={data} /> : <div>Loading...</div>}
            </div>
        </div>
    );
};

export default ChartInsightsByYear;
