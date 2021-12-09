using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class RedeSocialService : IRedeSocialService
    {
        private readonly IRedeSocialPersist _redeSocialPersist;
        private readonly IMapper _mapper;

        public RedeSocialService(IRedeSocialPersist redeSocialPersist,
                           IMapper mapper)
        {
            _redeSocialPersist = redeSocialPersist;
            _mapper = mapper;
        }

        public async Task AddRedeSocial(int Id, RedeSocialDto model, bool isEvento)
        {
            try
            {
                var RedeSocial = _mapper.Map<RedeSocial>(model);
                if (isEvento)
                {
                    RedeSocial.EventoId = Id;
                    RedeSocial.PalestranteId = null;
                } 
                else
                {
                    RedeSocial.EventoId = null;
                    RedeSocial.PalestranteId = Id;
                }

                _redeSocialPersist.Add<RedeSocial>(RedeSocial);

                await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> SaveByEvento(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                var RedeSocials = await _redeSocialPersist.GetAllByEventoIdAsync(eventoId);
                if (RedeSocials == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddRedeSocial(eventoId, model, true);
                    }
                    else
                    {
                        var RedeSocial = RedeSocials.FirstOrDefault(RedeSocial => RedeSocial.Id == model.Id);
                        model.EventoId = eventoId;

                        _mapper.Map(model, RedeSocial);

                        _redeSocialPersist.Update<RedeSocial>(RedeSocial);

                        await _redeSocialPersist.SaveChangesAsync();
                    }
                }

                var RedeSocialRetorno = await _redeSocialPersist.GetAllByEventoIdAsync(eventoId);

                return _mapper.Map<RedeSocialDto[]>(RedeSocialRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> SaveByPalestrante(int palestranteId, RedeSocialDto[] models)
        {
            try
            {
                var RedeSocials = await _redeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
                if (RedeSocials == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddRedeSocial(palestranteId, model, false);
                    }
                    else
                    {
                        var RedeSocial = RedeSocials.FirstOrDefault(RedeSocial => RedeSocial.Id == model.Id);
                        model.PalestranteId = palestranteId;

                        _mapper.Map(model, RedeSocial);

                        _redeSocialPersist.Update<RedeSocial>(RedeSocial);

                        await _redeSocialPersist.SaveChangesAsync();
                    }
                }

                var RedeSocialRetorno = await _redeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);

                return _mapper.Map<RedeSocialDto[]>(RedeSocialRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteByEvento(int eventoId, int redeSocialId)
        {
            try
            {
                var RedeSocial = await _redeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (RedeSocial == null) throw new Exception("Rede Social por Evento para delete não encontrado.");

                _redeSocialPersist.Delete<RedeSocial>(RedeSocial);
                return await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteByPalestrante(int palestranteId, int redeSocialId)
        {
            try
            {
                var RedeSocial = await _redeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
                if (RedeSocial == null) throw new Exception("Rede Social por Palestrante para delete não encontrado.");

                _redeSocialPersist.Delete<RedeSocial>(RedeSocial);
                return await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> GetAllByEventoIdAsync(int eventoId)
        {
            try
            {
                var RedeSocials = await _redeSocialPersist.GetAllByEventoIdAsync(eventoId);
                if (RedeSocials == null) return null;

                var resultado = _mapper.Map<RedeSocialDto[]>(RedeSocials);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> GetAllByPalestranteIdAsync(int palestranteId)
        {
            try
            {
                var RedeSocials = await _redeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
                if (RedeSocials == null) return null;

                var resultado = _mapper.Map<RedeSocialDto[]>(RedeSocials);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto> GetRedeSocialEventoByIdsAsync(int eventoId, int redeSocialId)
        {
            try
            {
                var RedeSocial = await _redeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (RedeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto>(RedeSocial);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto> GetRedeSocialPalestranteByIdsAsync(int palestranteId, int redeSocialId)
        {
            try
            {
                var RedeSocial = await _redeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
                if (RedeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto>(RedeSocial);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}