import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExcursionList = () => {
    const [excursions, setExcursions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExcursions = async () => {
            try {
                const response = await axios.get('/excursions/all');
                setExcursions(response.data);
            } catch (err) {
                setError('Failed to fetch excursions');
            } finally {
                setLoading(false);
            }
        };

        fetchExcursions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Excursions</h1>
            <ul>
                {excursions.map(excursion => (
                    <li key={excursion._id}>
                        <h2>{excursion.title}</h2>
                        <p>{excursion.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExcursionList;