import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../../api/api.js';

const UpdateExcursion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [excursion, setExcursion] = useState({
        title: '',
        description: '',
        date: '',
        price: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExcursion = async () => {
            try {
                const response = await api.fetchExcursionDetails(id);
                setExcursion(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching excursion:', error);
            }
        };

        fetchExcursion();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExcursion((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.updateExcursion(`/admin/excursions/${id}`, excursion);
            navigate('/admin/manage-excursions');
        } catch (error) {
            console.error('Error updating excursion:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Excursion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={excursion.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={excursion.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={excursion.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={excursion.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Excursion</button>
            </form>
        </div>
    );
};

export default UpdateExcursion;