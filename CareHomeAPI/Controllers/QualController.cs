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
    public class QualController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAppRepository _appRepository;
        public QualController(IMapper mapper, 
            IAppRepository appRepository,
            IUnitOfWork unitOfWork)
        {
            _appRepository = appRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddQualification(QualDto qualDto)
        {
            var qual = _mapper.Map<Qualification>(qualDto);

            _appRepository.Add(qual);

            await _unitOfWork.SaveAll();

            return Ok(qual);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQualification(int id)
        {
            var qualToDelete = await _appRepository.FindQualification(id);

            if (qualToDelete == null)
                return NotFound();

            _appRepository.Delete(qualToDelete);

            await _unitOfWork.SaveAll();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindQualification(int id)
        {
            var qualFromRepo = await _appRepository.FindQualification(id);

            if (qualFromRepo == null)
                return NotFound();

            var qualDto = _mapper.Map<QualDto>(qualFromRepo);
            
            return Ok(qualDto);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQualification(QualDto qualToUpdate)
        {
            var qualFromRepo = await _appRepository.FindQualification(qualToUpdate.Id);

            if (qualFromRepo == null)
                return NotFound();

            _mapper.Map<QualDto, Qualification>(qualToUpdate, qualFromRepo);

            await _unitOfWork.SaveAll();

            return NoContent();
        }
    }
}