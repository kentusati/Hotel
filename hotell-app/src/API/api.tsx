const api = {
    updateCommentRating: async (commentId: number, newRating: number) => {
      try {
        // Отправить запрос на сервер для обновления оценки комментария
        const response = await fetch(`/api/comments/${commentId}/rating`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating: newRating }),
        });
  
        if (!response.ok) {
          throw new Error('Не удалось обновить оценку комментария');
        }
  
        // Возвращаем обновленный комментарий с сервера (если необходимо)
        const updatedComment = await response.json();
        return updatedComment;
      } catch (error) {
        throw new Error(`Ошибка при обновлении оценки комментария: ${ error }`);
      }
    },
  };
  
  export default api;