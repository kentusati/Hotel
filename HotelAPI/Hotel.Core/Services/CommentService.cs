using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.AspNetCore.Identity;


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
                UserId = Guid.Parse(item.UserId),
            };
            await _commentRep.AddAsync(newComment);
            await _commentRep.SaveAsync();
            return newComment;
        }

        public async Task<Comment> DeleteComment(Guid id)
        {
            var item = await _commentRep.GetByIdAsync(id);
            if (item == null) return null;
            _commentRep.Delete(item);
            await _commentRep.SaveAsync();
            return item;
        }

        public async Task<IEnumerable<Comment>> GetAllComments()
        {
            return await _commentRep.GetAllItemsAsyncWithInclude(com=>com.User);
        }

        public Task<Comment> GetCommentById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Comment> UpdateComment(Guid id, AddCommentRequest addRequest)
        {
            var item = await _commentRep.GetByIdAsync(id);
            if (item == null) return item;
            _commentRep.Update(item);
            item.text = addRequest.text;
            item.rating = addRequest.rating;
            await _commentRep.SaveAsync();
            return item;
        }
    }
}
