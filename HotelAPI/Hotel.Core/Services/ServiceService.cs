using Hotel.Core.Interfaces;
using Hotel.DataAccess.DTOs;
using Hotel.DataAccess.Models;
using Hotel.Infastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Hotel.Core.Services
{
    public class ServiceService : IServiceService
    {
        private readonly Repository<Service> _serviceRep;
        public ServiceService(HotelAPIDBcontext dbContext)
        {
            this._serviceRep = new Repository<Service>(dbContext);
        }

        public async Task<Service> AddService(AddServiceRequest item)
        {
            var newService = new Service()
            {
                Id = Guid.NewGuid(),
                Name = item.Name,
                Price = item.Price,
                Description = item.Description,
            };
            await _serviceRep.AddAsync(newService);
            await _serviceRep.SaveAsync();
            return newService;
        }

        public Task<Service> AddTestService()
        {
            throw new NotImplementedException();
        }

        public async Task<Service> DeleteService(Guid id)
        {
            var service = await _serviceRep.GetByIdAsync(id);
            if (service == null) return service;
            _serviceRep.Delete(service);
            await _serviceRep.SaveAsync();
            return service;
        }

        public async Task<IEnumerable<Service>> GetAllServices()
        {
            var services = await _serviceRep.GetAllItemsAsync();
            return services;
        }

        public Task<Service> GetServiceById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Service> UpdateService(Guid id, AddServiceRequest item)
        {
            var service = await _serviceRep.GetByIdAsync(id);
            if (service == null) return service;
            _serviceRep.Update(service);
            service.Name = item.Name;
            service.Img = item.Img;
            service.Price = item.Price;
            service.Description = item.Description;
            await _serviceRep.SaveAsync();
            return service;
        }
    }
}
