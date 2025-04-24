import React from "react";
import axios from "axios";
import { API_URL } from "../../api/api";


const PurchaseButton = ({ excursionId }) => {
  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Вы не авторизованы!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/excursions/purchase`,
        { excursionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Обработка успешного ответа
      alert("Экскурсия успешно приобретена!");
      //console.log(response.data);
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