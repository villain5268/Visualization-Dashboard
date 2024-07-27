import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../api';

const ChartSourceInsights = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/');
            const insights = response.data;

            const sources = [...new Set(insights.map(insight => insight.source))];
            const sourceCounts = sources.map(source => {
                return insights.filter(insight => insight.source === source).length;
            });

            setData({
                labels: sources,
                datasets: [
                    {
                        label: 'Source-wise Insights',
                        data: sourceCounts,
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    }
                ]
            });
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Source-wise Insights</h2>
            <Bar data={data} />
        </div>
    );
};

export default ChartSourceInsights;
