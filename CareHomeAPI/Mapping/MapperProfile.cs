using AutoMapper;
using CareHomeAPI.Dtos;
using CareHomeAPI.Models;

namespace CareHomeAPI.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            // Domain to API Resources
            CreateMap<Home, HomeDto>();
            CreateMap<Staff, StaffDto>();
            CreateMap<Qualification, QualDto>();

            // API Resouces to Domain
            CreateMap<HomeDto, Home>();
            CreateMap<StaffDto, Staff>();
            CreateMap<QualDto, Qualification>();
            CreateMap<StaffToUpdateDto, Staff>();
        }
    }
}