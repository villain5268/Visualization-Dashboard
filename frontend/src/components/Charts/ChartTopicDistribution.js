import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components
import api from '../../api';
import './ChartTopicDistribution.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartTopicDistribution = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                const insights = response.data;

                if (insights && insights.length > 0) {
                    const topics = [...new Set(insights.map(insight => insight.topic))];
                    const topicCounts = topics.map(topic => {
                        return insights.filter(insight => insight.topic === topic).length;
                    });

                    setData({
                        labels: topics,
                        datasets: [
                            {
                                label: 'Topic Distribution',
                                data: topicCounts,
                                backgroundColor: topics.map((_, idx) => `rgba(${idx * 20 % 255}, ${idx * 40 % 255}, ${idx * 60 % 255}, 0.6)`),
                            }
                        ]
                    });
                } else {
                    setError('No insights available');
                }
            } catch (err) {
                setError('Failed to load insights');
            }
        };

        fetchData();
    }, []);

    return (
        <div className='grid-one-item grid-common grid-c7'>
            <div className='grid-c-title'>
                <h3 className='grid-c-title-text'>Topic Distribution</h3>
                <button className='grid-c-title-icon'>
                    <FontAwesomeIcon icon={faChartPie} />
                </button>
            </div>
            <div>
                {error ? (
                    <div className="error">{error}</div>
                ) : data ? (
                    <Pie data={data} />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default ChartTopicDistribution;
