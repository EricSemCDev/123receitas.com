const request = require('supertest');
const path = require('path');
const fs = require('fs');

let receitaId;

describe('CRUD de Receita', () => {
  it('deve criar uma receita com imagem', async () => {
    const imagemPath = path.resolve(__dirname, 'mock', 'foto_receita.jpg');
    if (!fs.existsSync(imagemPath)) {
      console.warn('Imagem de teste não encontrada, ignorando teste de imagem.');
      return;
    }

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/receita')
      .set('Authorization', `Bearer ${global.token}`)
      .field('titulo', 'Receita Teste')
      .field('descricao', 'Uma receita de teste deliciosa.')
      .field('modo_preparo', 'Misture tudo e asse.')
      .field('tempo_preparo', 30)
      .field('porcoes', 4)
      .field('dificuldade', 2)
      .field('ingredientes', 'Farinha, Ovos, Açúcar')
      .field('criador', global.usuarioId)
      .attach('fotos', imagemPath);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('titulo', 'Receita Teste');
    receitaId = res.body.id;
  });

  it('deve retornar todas as receitas', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get('/receita');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('titulo');
      expect(res.body[0]).toHaveProperty('criador');
    }
  });

  it('deve retornar uma receita por ID', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get(`/receita/${receitaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', receitaId);
  });

  it('deve atualizar a receita', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/receita/${receitaId}`)
      .set('Authorization', `Bearer ${global.token}`)
      .send({
        titulo: 'Receita Atualizada'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body.receita).toHaveProperty('titulo', 'Receita Atualizada');
  });

  it('deve deletar a receita', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .delete(`/receita/${receitaId}`)
      .set('Authorization', `Bearer ${global.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('deve retornar 404 ao buscar receita deletada', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get(`/receita/${receitaId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });
});
