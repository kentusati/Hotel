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

        public Task<Comment> AddComment(AddCommentRequest item)
        {
            var newBooking = new Booking()
            {
                Id = Guid.NewGuid(),
                StartTime = DateTime.Now,
                EndTime = DateTime.Now,
            };
            //await _bookingRep.AddAsync(newBooking);
            //await _bookingRep.SaveAsync();
            return null;
        }

        public Task<Comment> AddTestComment()
        {
            throw new NotImplementedException();
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
