const request = require('supertest');
const fs = require('fs');
const path = require('path');

let usuarioId;
let token;

describe('UserFotoController - CRUD da foto do usuário', () => {
  beforeAll(async () => {
    const timestamp = Date.now();
    const email = `foto_user_${timestamp}@example.com`;

    await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Usuário Foto')
      .field('email', email)
      .field('usuario', `user_foto_${timestamp}`)
      .field('senha', '123');

    const login = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({ email, senha: '123' });

    token = login.body.token;
    usuarioId = login.body.usuario.id;
  });

  it('deve adicionar uma foto base64 para o usuário', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_usuario.jpg');
    const fotoBase64 = fs.readFileSync(imgPath).toString('base64');

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/user_foto')
      .send({
        usuario: usuarioId,
        user_foto: fotoBase64
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve retornar a foto base64 do usuário', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/user_foto/${usuarioId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('foto');
    expect(typeof res.body.foto).toBe('string');
  });

  it('deve atualizar a foto do usuário', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_usuario.jpg');
    const novaFotoBase64 = fs.readFileSync(imgPath).toString('base64');

    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/user_foto/${usuarioId}`)
      .send({ user_foto: novaFotoBase64 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Foto atualizada com sucesso');
  });

  it('deve falhar ao criar sem foto', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/user_foto')
      .send({ usuario: usuarioId });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro', 'Foto do usuário é obrigatória');
  });

  it('deve falhar ao criar sem usuário', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_usuario.jpg');
    const fotoBase64 = fs.readFileSync(imgPath).toString('base64');

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/user_foto')
      .send({ user_foto: fotoBase64 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro', 'Usuário é obrigatório para associar a foto');
  });

  it('deve retornar erro ao buscar foto de usuário inexistente', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/user_foto/999999`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar erro ao atualizar sem foto', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/user_foto/${usuarioId}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro', 'Foto obrigatória');
  });

  it('deve retornar erro ao atualizar usuário inexistente', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_usuario.jpg');
    const novaFotoBase64 = fs.readFileSync(imgPath).toString('base64');

    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/user_foto/999999`)
      .send({ user_foto: novaFotoBase64 });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro', 'Foto não encontrada para este usuário');
  });
});
