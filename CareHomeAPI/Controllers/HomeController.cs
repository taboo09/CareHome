using System.Collections.Generic;
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
    public class HomeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAppRepository _appRepository;
        public HomeController(IMapper mapper,
            IUnitOfWork unitOfWork,
            IAppRepository appRepository)
        {
            _appRepository = appRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddHome(HomeDto homeDto)
        {
            if (await _appRepository.CheckHomeName(homeDto.Name))
                return BadRequest($"Home {homeDto.Name.ToUpper()} already exists in database.");

            var home = _mapper.Map<Home>(homeDto);
            _appRepository.Add(home);

            await _unitOfWork.SaveAll();

            return Ok(home);
        }

        [HttpGet]
        public async Task<IActionResult> GetHomes()
        {
            var homesFromRepo = await _appRepository.GetHomes();
            var homesDto = _mapper.Map<List<HomeDto>>(homesFromRepo);

            return Ok(homesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHome(int id)
        {
            var homeFromRepo = await _appRepository.GetHome(id);

            if (homeFromRepo == null)
                return NotFound("Home not found");
                
            var homeDto = _mapper.Map<HomeDto>(homeFromRepo);

            return Ok(homeDto);
        }
    }
}