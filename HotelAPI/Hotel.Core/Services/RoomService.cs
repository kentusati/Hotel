
using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;


namespace Hotel.Core.Services
{
    public class RoomService : IRoomService
    {
        private readonly Repository<Room> _roomRep;

        public RoomService(HotelAPIDBcontext dbContext)
        {
            this._roomRep = new Repository<Room>(dbContext);
        }

        public async Task<Room> AddRoom(AddRoomRequest item)
        {
            var newRoom = new Room()
            {
                Id = Guid.NewGuid(),
                Name = item.Name,
                Price_day = item.Price_day,
                Img = item.Img,
                Available = item.Available,
                Number = item.Number,
                Description = item.Description,
            };
            await _roomRep.AddAsync(newRoom);
            await _roomRep.SaveAsync();
            return newRoom;
        }

        public Task<Room> AddTestRoom()
        {
            throw new NotImplementedException();
        }

        public async Task<Room> DeleteRoom(Guid id)
        {
            var service = await _roomRep.GetByIdAsync(id);
            if (service == null) return service;
            _roomRep.Delete(service);
            await _roomRep.SaveAsync();
            return service;
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _roomRep.GetAllItemsAsync();
        }

        public Task<Room> GetRoomById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Room> UpdateRoom(Guid id, AddRoomRequest item)
        {
            var room = await _roomRep.GetByIdAsync(id);
            if (room == null) return room;
            _roomRep.Update(room);
            room.Name = item.Name;
            room.Number = item.Number;
            room.Available = item.Available;
            room.Img = item.Img;
            room.Price_day = item.Price_day;
            room.Description = item.Description;
            await _roomRep.SaveAsync();
            return room;
        }
    }
}
