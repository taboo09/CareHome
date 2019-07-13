using System.Threading.Tasks;
using AutoMapper;
using CareHomeAPI.Dtos;
using CareHomeAPI.Models;
using CareHomeAPI.Persistence.Core;
using Microsoft.AspNetCore.Mvc;

namespace CareHomeAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAppRepository _appRepository;
        public StaffController(IMapper mapper, 
            IUnitOfWork unitOfWork, 
            IAppRepository appRepository)
        {
            _appRepository = appRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddStaff(StaffDto staffDto)
        {
            var staff = _mapper.Map<Staff>(staffDto);

            _appRepository.Add(staff);

            await _unitOfWork.SaveAll();

            return Ok(staff);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staffToDelete = await _appRepository.FindStaff(id);

            if (staffToDelete == null)
                return NotFound();

            _appRepository.Delete(staffToDelete);

            await _unitOfWork.SaveAll();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindStaff(int id)
        {
            var staffFromRepo = await _appRepository.FindStaff(id);

            if (staffFromRepo == null)
                return NotFound();
                
            var staff = _mapper.Map<StaffDto>(staffFromRepo);

            return Ok(staff);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStaff(StaffToUpdateDto staffToUpdate)
        {
            var staffFromRepo = await _appRepository.FindStaff(staffToUpdate.Id);

            if (staffFromRepo == null)
                return NotFound();

            _mapper.Map<StaffToUpdateDto, Staff>(staffToUpdate, staffFromRepo);

            await _unitOfWork.SaveAll();

            return NoContent();
        }
    }
}