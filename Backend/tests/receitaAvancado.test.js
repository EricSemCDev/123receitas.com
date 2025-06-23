const request = require('supertest');
const path = require('path');
const fs = require('fs');

let token;
let usuarioId;
let receitaId;

beforeAll(async () => {
  const login = await request(global.sailsApp.hooks.http.app)
    .post('/auth/login')
    .send({
      email: 'teste@example.com',
      senha: '123'
    });

  token = login.body.token;
  usuarioId = login.body.usuario.id;

  const imagemPath = path.resolve(__dirname, 'mock', 'foto_receita.jpg');
  if (!fs.existsSync(imagemPath)) {
    console.warn('Imagem de teste não encontrada.');
    throw new Error('Imagem de teste não encontrada.');
  }

  const nova = await request(global.sailsApp.hooks.http.app)
    .post('/receita')
    .set('Authorization', `Bearer ${token}`)
    .field('titulo', 'Receita Completa')
    .field('descricao', 'Receita com tudo para testes avançados.')
    .field('modo_preparo', 'Misture tudo e asse com carinho.')
    .field('tempo_preparo', 45)
    .field('porcoes', 6)
    .field('dificuldade', 3)
    .field('ingredientes', 'Carinho, Farinha, Amor')
    .field('criador', usuarioId)
    .field('categorias', JSON.stringify([1])) // associar categoria de ID 1
    .attach('fotos', imagemPath);

  receitaId = nova.body.id;
});

describe('Receita Avançado - findAllByUser e getById', () => {
  it('deve retornar receitas do usuário com imagens e categorias nomeadas', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/receita/usuario/${usuarioId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('categorias');
    expect(res.body[0]).toHaveProperty('imagens');
    expect(Array.isArray(res.body[0].categorias)).toBe(true);
    expect(Array.isArray(res.body[0].imagens)).toBe(true);
  });

  it('deve retornar a receita completa com imagens em base64', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/receita/detalhes/${receitaId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('fotos');
    expect(Array.isArray(res.body.fotos)).toBe(true);
    expect(res.body.fotos[0]).toHaveProperty('receita_foto');
    expect(typeof res.body.fotos[0].receita_foto).toBe('string');
  });
});
