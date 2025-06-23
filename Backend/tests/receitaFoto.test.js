const request = require('supertest');
const fs = require('fs');
const path = require('path');

let receitaId;
let fotoId;

beforeAll(async () => {
  const timestamp = Date.now();
  const email = `foto_${timestamp}@example.com`;

  // Cria usuário
  await request(global.sailsApp.hooks.http.app)
    .post('/usuario')
    .field('nome', 'User Foto')
    .field('email', email)
    .field('usuario', `user_foto_${timestamp}`)
    .field('senha', '123');

  // Login
  const login = await request(global.sailsApp.hooks.http.app)
    .post('/auth/login')
    .send({ email, senha: '123' });

  const token = login.body.token;
  const usuarioId = login.body.usuario.id;

  // Cria receita
  const receita = await request(global.sailsApp.hooks.http.app)
    .post('/receita')
    .set('Authorization', `Bearer ${token}`)
    .field('titulo', 'Receita com foto')
    .field('descricao', 'Teste com imagem')
    .field('modo_preparo', 'Misture e asse')
    .field('tempo_preparo', 30)
    .field('porcoes', 3)
    .field('dificuldade', 2)
    .field('ingredientes', 'ingrediente 1, ingrediente 2')
    .field('criador', usuarioId);

  receitaId = receita.body.id;
});

describe('ReceitaFotoController - CRUD de fotos de receita', () => {
  it('deve adicionar uma foto para uma receita', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_receita.jpg');
    const fotoBase64 = fs.readFileSync(imgPath).toString('base64');

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/receita_foto')
      .send({
        receita: receitaId,
        receita_foto: fotoBase64
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    fotoId = res.body.id;
  });

  it('deve retornar todas as fotos da receita', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/receita_foto/${receitaId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('foto');
  });

  it('deve retornar a imagem em formato binário', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/receita/foto/${fotoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('image/jpeg');
  });

  it('deve atualizar a imagem da receita', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_receita.jpg');
    const novaFotoBase64 = fs.readFileSync(imgPath).toString('base64');

    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/receita_foto/${receitaId}`)
      .send({ receita_foto: novaFotoBase64 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });
});
