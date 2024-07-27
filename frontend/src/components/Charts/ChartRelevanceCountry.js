import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../api';
import './ChartRelevanceCountry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

const ChartRelevanceCountry = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Relevance by Country',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const countryAbbreviations = {
        'United States of America': 'USA',
        // Add more abbreviations as needed
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/');
                const insights = response.data;

                if (!Array.isArray(insights)) {
                    throw new Error("API response is not an array");
                }

                const countries = [...new Set(insights.map(insight => 
                    countryAbbreviations[insight.country] || insight.country
                ))];
                const relevanceData = countries.map(country => {
                    const countryInsights = insights.filter(insight => 
                        (countryAbbreviations[insight.country] || insight.country) === country
                    );
                    return countryInsights.reduce((sum, insight) => sum + parseInt(insight.relevance, 10), 0);
                });

                setData({
                    labels: countries,
                    datasets: [
                        {
                            label: 'Relevance by Country',
                            data: relevanceData,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        }
                    ]
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='grid-one-item grid-common grid-c5'>
            <div className='grid-c-title'>
                <h3 className='grid-c-title-text'>Relevance by Country</h3>
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

export default ChartRelevanceCountry;
