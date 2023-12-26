
using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;


namespace Hotel.Core.Services
{
    public class RoomService : IRoomService
    {
        private readonly Repository<Room> _roomRep;
        private readonly Repository<RoomType> _roomTypeRep;

        public RoomService(HotelAPIDBcontext dbContext)
        {
            this._roomRep = new Repository<Room>(dbContext);
            this._roomTypeRep = new Repository<RoomType>(dbContext);
        }

        public async Task<Room> AddRoom(AddRoomRequest item)
        {
            var newRoom = new Room()
            {
                Id = Guid.NewGuid(),
                RoomNumber = item.RoomNumber,
                RoomTypeId = Guid.Parse(item.RoomTypeId)
            };
            await _roomRep.AddAsync(newRoom);
            await _roomRep.SaveAsync();
            return newRoom;
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
        public async Task<IEnumerable<Room>> GetAllRoomsByTypeId(Guid id)
        {
            return await _roomRep.FindAsync(r=>r.RoomTypeId==id);
        }
        public async Task<IEnumerable<RoomType>> GetAllRoomsTypes()
        {
            return await _roomTypeRep.GetAllItemsAsync();
        }
        public async Task<RoomType> AddRoomType(AddRoomTypeRequest item)
        {
            var newRoomType = new RoomType()
            {
                Id = Guid.NewGuid(),
                Type = item.Type,
                Price_day = item.Price_day,
                Description = item.Description,
            };
            await _roomTypeRep.AddAsync(newRoomType);
            await _roomTypeRep.SaveAsync();
            return newRoomType;
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
            room.RoomNumber = item.RoomNumber;
            room.RoomTypeId = Guid.Parse(item.RoomTypeId);
            await _roomRep.SaveAsync();
            return room;
        }
    }
}
