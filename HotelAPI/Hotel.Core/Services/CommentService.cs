using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;


namespace Hotel.Core.Services
{
    public class CommentService : ICommentService
    {
        private readonly Repository<Comment> _commentRep;

        public CommentService(HotelAPIDBcontext dbContext)
        {
            this._commentRep = new Repository<Comment>(dbContext);
        }

        public async Task<Comment> AddComment(AddCommentRequest item)
        {
            var newComment = new Comment()
            {
                Id = Guid.NewGuid(),
                rating = item.rating,
                text = item.text,
            };
            await _commentRep.AddAsync(newComment);
            await _commentRep.SaveAsync();
            return null;
        }

        public Task<Comment> DeleteComment(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Comment>> GetAllComments()
        {
            throw new NotImplementedException();
        }

        public Task<Comment> GetCommentById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Comment> UpdateComment(Guid id, AddCommentRequest item)
        {
            throw new NotImplementedException();
        }
    }
}
