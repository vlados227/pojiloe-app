import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../App.css";
import { API_URL } from '../../api/api';
import { Link } from 'react-router-dom';

import PurchaseButton from './PurchaseButton';
import { jwtDecode } from 'jwt-decode';
import Login from '../Auth/Login';


const Excursions = () => {
  const [excursions, setExcursions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [decoded, setDecoded] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {

    const fetchExcursions = async () => {
      try {
        const response = await axios.get(`${API_URL}/excursions/all?page=${page}&limit=10`);
        setExcursions(response.data.excursions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Ошибка при загрузке экскурсий:', error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setDecoded(jwtDecode(token));
      setHasToken(true);
    } else {
      setDecoded(null);
      setHasToken(false);
    }

    fetchExcursions();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Список экскурсий</h1>
      <ul>
        {excursions.map((excursion) => (
          <li className='excursion__card' key={excursion._id}>
            <h2>{excursion.title}</h2>
            <p>{excursion.description}</p>
            <p>Местоположение: {excursion.location}</p>
            <p>Дата: {new Date(excursion.date).toLocaleDateString()}</p>
            <p>Цена: {excursion.price} руб.</p>
            <p>Максимальное количество участников: {excursion.maxParticipants}</p>
            {hasToken && decoded && (
              <PurchaseButton excursionId={excursion._id} userId={decoded._id}/>
            )}
            {!hasToken && (
              <p className='notify'><Link className='toLogin__link' to={'/login'}>Войдите,</Link> чтобы купить экскурсию</p>
            )}
          </li>
        ))}
      </ul>
        <div className='pagination'>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Назад
          </button>
          <p>Страница {page} из {totalPages}</p>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Вперед
          </button>
        </div>
    </div>
  );
};

export default Excursions;