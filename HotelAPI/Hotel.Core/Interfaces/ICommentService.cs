using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;

namespace Hotel.Core.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetAllComments(); // получение всех объектов
        Task<Comment> GetCommentById(Guid id); // получение одного объекта по id
        Task<Comment> AddComment(AddCommentRequest item); // создание объекта
        Task<Comment> UpdateComment(Guid id, AddCommentRequest item); // обновление объекта
        Task<Comment> DeleteComment(Guid id); // удаление объекта по id

        Task<Comment> AddTestComment();
    }
}
