import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageExcursions = () => {
    const [excursions, setExcursions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExcursions = async () => {
            try {
                const response = await axios.get('/api/admin/all');
                setExcursions(response.data);
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
            await axios.delete(`/api/admin/excursions/delete/${id}`);
            setExcursions(excursions.filter(excursion => excursion._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Manage Excursions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {excursions.map(excursion => (
                        <tr key={excursion._id}>
                            <td>{excursion.name}</td>
                            <td>{excursion.description}</td>
                            <td>
                                <button onClick={() => handleDelete(excursion._id)}>Delete</button>
                                <button onClick={() => {/* Navigate to update page */}}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageExcursions;