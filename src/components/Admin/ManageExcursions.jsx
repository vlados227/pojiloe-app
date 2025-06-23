import React, { useEffect, useState } from 'react';
import * as api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const ManageExcursions = () => {
    const [excursions, setExcursions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExcursions = async () => {
            try {
                const response = await api.fetchExcursions(localStorage.token);
                setExcursions(response.data.excursion);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchExcursions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.deleteExcursion(id, localStorage.token);
            setExcursions(excursions.filter(excursion => excursion._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <center>Загрузка...</center>;
    if (error) return <center>Ошибка: {error}</center>;

    return (
        <div>
            <h1>Управление экскурсиями</h1>
            <table className="excursions-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Записаны</th>
                        <th>Дата</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    excursions.map((excursion, index) => (
                        <tr key={excursion._id}>
                            <td>{index + 1 }</td>
                            <td>{excursion.name || excursion.title}</td>
                            <td>{excursion.description}</td>
                            <td>
                                {excursion.participants && excursion.participants.length > 0 ? (
                                    <ul className='participants__list'>
                                        {excursion.participants.map(user => (
                                            <li key={user._id}>
                                                {user.fullName} ({user.email}) <br />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>Нет записанных</span>
                                )}
                            </td>
                            <td>{Intl.DateTimeFormat('ru-Ru', {
                                dateStyle: 'full',
                                timeStyle: 'short',
                                timeZone: 'Europe/Samara'
                            }).format(new Date(excursion.date))}</td>
                            <td>
                                <button onClick={() => handleDelete(excursion._id)}>Удалить</button>
                                <button onClick={() => navigate(`/admin/update-excursion/${excursion._id}`)}>Обновить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageExcursions;