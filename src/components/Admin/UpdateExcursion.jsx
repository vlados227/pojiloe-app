import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../../api/api.js';
import '../../App.css';

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
            const data = await api.fetchExcursionDetails(id, localStorage.token);
            console.log(data.date);
            setExcursion({
                title: data.title || '',
                description: data.description || '',
                date: data.date ? data.date.slice(0, 10) : '',
                price: data.price || '',
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching excursion:', error);
            setLoading(false);
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
            await api.updateExcursion(id, excursion, localStorage.token);
            navigate('/admin/manage-excursions');
        } catch (error) {
            console.error('Error updating excursion:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-excursion-container">
            <h2>Update Excursion</h2>
            <form className="update-excursion-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название:</label>
                    <input
                        placeholder={excursion.title}
                        type="text"
                        name="title"
                        value={excursion.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={excursion.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Дата:</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={excursion.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Цена:</label>
                    <input
                        type="number"
                        name="price"
                        value={excursion.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Update Excursion</button>
            </form>
        </div>
    );
};

export default UpdateExcursion;