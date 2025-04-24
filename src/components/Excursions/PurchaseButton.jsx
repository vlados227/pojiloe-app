import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import "../../App.css"


const PurchaseButton = ({ excursionId, userId }) => {
  const [status, setStatus] = useState('Приобрести');
  
  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("token");
      const date = new Date().toISOString();

      if (!token) {
        alert("Вы не авторизованы!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/excursions/purchase`,
        { excursionId, userId, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Обработка успешного ответа
      alert("Экскурсия успешно приобретена!");
      setStatus("Приобретено");
    } catch (error) {
      console.error("Ошибка при покупке экскурсии:", error);
      alert(
        error.response?.data?.message || "Не удалось приобрести экскурсию."
      );
    }
  };

  return (
    <button className="purchase__button" onClick={handlePurchase}>
      {status}
    </button>
  );
};

export default PurchaseButton;