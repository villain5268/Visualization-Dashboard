import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import './ChartIntensityLikelihood.css';

const ChartIntensityLikelihood = () => {
    const [data, setData] = useState({ datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/');
            const insights = response.data;

            const chartData = {
                datasets: [
                    {
                        label: 'Intensity vs Likelihood',
                        data: insights.map(insight => ({
                            x: insight.intensity,
                            y: insight.likelihood
                        })),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    }
                ]
            };

            setData(chartData);
        };

        fetchData();
    }, []);

    return (
        <div className='grid-one-item grid-common grid-c2'>
            <div className='grid-c-title'>
                <h3 className='grid-c-title-text'>Intensity vs Likelihood</h3>
                <button className='grid-c-title-icon'>
                    <FontAwesomeIcon icon={faChartColumn} />
                </button>
            </div>
            <div className='chart-grid-item'>
                <Scatter data={data} />
            </div>
        </div>
    );
};

export default ChartIntensityLikelihood;
