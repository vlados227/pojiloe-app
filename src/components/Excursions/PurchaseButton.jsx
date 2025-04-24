import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";


const PurchaseButton = ({ excursionId, userId }) => {

  const [message, setMessage] = useState(null)
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
      console.log(message);
      // setMessage(response.data.message)
    } catch (error) {
      console.error("Ошибка при покупке экскурсии:", error);
      alert(
        error.response?.data?.message || "Не удалось приобрести экскурсию."
      );
    }
  };

  return (
    <button onClick={handlePurchase}>
      Купить экскурсию
    </button>
  );
};

export default PurchaseButton;