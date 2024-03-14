using gesprofAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gesprofAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessorController : ControllerBase
    {
        private readonly ProfessorContext _professorContext;

        public ProfessorController(ProfessorContext professorContext)
        {
            _professorContext = professorContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Professor>>> GetProfessors()
        {
            if(_professorContext.Professors == null)
            {
                return NotFound();
            }
            else
            {
                return await _professorContext.Professors.ToListAsync();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Professor>> GetProfessor(int id)
        {
            if(_professorContext.Professors == null)
            {
                return NotFound();
            }
            var professor = await _professorContext.Professors.FindAsync(id);
            if(professor == null)
            {
                return NotFound();
            }
            return professor;
        }

        [HttpPost]
        public async Task<ActionResult<Professor>> PostProfessor(Professor professor)
        {
            _professorContext.Professors.Add(professor);
            await _professorContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfessor), new {professor.ID}, professor);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutProfessor ( int id, Professor professor)
        {
            if ( id != professor.ID )
            {
                return BadRequest();
            }
            _professorContext.Entry(professor).State = EntityState.Modified;
            try
            {
                await _professorContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProfessor (int id)
        {
            if(_professorContext.Professors == null)
            {
                return NotFound();
            }
            var professor = await _professorContext.Professors.FindAsync(id);
            if(professor == null)
            {
                return NotFound();
            }
            _professorContext.Professors.Remove(professor);
            await _professorContext.SaveChangesAsync();

            return Ok();
        }

    }
}
