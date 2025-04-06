import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExcursionDetails = () => {
    const { id } = useParams();
    const [excursion, setExcursion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExcursionDetails = async () => {
            try {
                const response = await axios.get(`/excursions/${id}`);
                setExcursion(response.data);
            } catch (err) {
                setError('Error fetching excursion details');
            } finally {
                setLoading(false);
            }
        };

        fetchExcursionDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{excursion.title}</h1>
            <p>{excursion.description}</p>
            <img src={excursion.imageUrl} alt={excursion.title} />
            <p>Price: ${excursion.price}</p>
            <p>Date: {new Date(excursion.date).toLocaleDateString()}</p>
        </div>
    );
};

export default ExcursionDetails;