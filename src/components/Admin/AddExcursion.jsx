import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';

const AddExcursion = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!image) {
            setError('Изображение обязательно');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('date', date);
        formData.append('maxParticipants', maxParticipants);
        formData.append('location', location);
        formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/admin/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response.status !== 201) {
                throw new Error('Не удалось добавить экскурсию');
            }
            setSuccess('Экскурсия успешно добавлена!');
            setTitle('');
            setDescription('');
            setPrice('');
            setDate('');
            setMaxParticipants('');
            setLocation('');
            setImage(null);
        } catch (err) {
            setError('Не удалось добавить экскурсию. ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="update-excursion-container">
            <h2>Добавить новую экскурсию</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit} className='update-excursion-form' encType="multipart/form-data">
                <div className="form-group">
                    <label>Название:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Цена:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Дата:</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Максимальное количество участников:</label>
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={e => setMaxParticipants(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Местоположение:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Изображение:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Добавить экскурсию</button>
            </form>
        </div>
    );
};

export default AddExcursion;
