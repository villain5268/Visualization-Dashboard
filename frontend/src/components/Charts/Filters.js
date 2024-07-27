import React, { useState, useEffect } from 'react';
import api from '../../api';

const Filters = () => {
    const [filters, setFilters] = useState({
        end_year: [],
        topic: [],
        sector: [],
        region: [],
        pestle: [],
        source: [],
        country: [],
    });

    useEffect(() => {
        const fetchFilters = async () => {
            const filterNames = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country'];
            const filterData = {};
            for (let filter of filterNames) {
                const response = await api.get(`/${filter}`);
                filterData[filter] = response.data;
            }
            setFilters(filterData);
        };

        fetchFilters();
    }, []);

    return (
        <div className="filters">
            {Object.keys(filters).map(filter => (
                <div key={filter}>
                    <label>{filter}</label>
                    <select>
                        {filters[filter].map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default Filters;
