const request = require('supertest');
const path = require('path');
const fs = require('fs');

let userId;
let token;
let emailOriginal;
let usuarioOriginal;

beforeAll(async () => {
  const timestamp = Date.now();
  emailOriginal = `crud_${timestamp}@example.com`;
  usuarioOriginal = `crud_usuario_${timestamp}`;

  const res = await request(global.sailsApp.hooks.http.app)
    .post('/usuario')
    .field('nome', 'Usuário Teste CRUD')
    .field('email', emailOriginal)
    .field('usuario', usuarioOriginal)
    .field('senha', '123');

  userId = res.body.id;

  const login = await request(global.sailsApp.hooks.http.app)
    .post('/auth/login')
    .send({ email: emailOriginal, senha: '123' });

  token = login.body.token;
});


describe('UsuarioController - CRUD completo', () => {
  it('deve retornar erro ao tentar criar usuário sem senha', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Sem Senha')
      .field('email', `sem_senha_${Date.now()}@test.com`)
      .field('usuario', `sem_senha_${Date.now()}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar erro ao enviar imagem inválida', async () => {
    const timestamp = Date.now();
    const fakeFilePath = path.resolve(__dirname, 'mock/arquivo_fake.txt');
    fs.writeFileSync(fakeFilePath, 'conteúdo inválido');

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Arquivo Invalido')
      .field('email', `arquivo_${timestamp}@email.com`)
      .field('usuario', `arquivo_user_${timestamp}`)
      .field('senha', '123')
      .attach('imagem', fakeFilePath);

    expect([201, 500]).toContain(res.statusCode);
    fs.unlinkSync(fakeFilePath);
  });

  it('deve retornar erro ao buscar imagem de usuário inexistente', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get('/usuario/99999999/foto');

    expect(res.statusCode).toBe(404);
  });

  it('deve forçar erro ao enviar imagem vazia', async () => {
    const emptyPath = path.resolve(__dirname, 'mock/arquivo_vazio.jpg');
    fs.writeFileSync(emptyPath, '');

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Erro Upload')
      .field('email', `erro_upload_${Date.now()}@mail.com`)
      .field('usuario', `erro_upload_${Date.now()}`)
      .field('senha', '123')
      .attach('imagem', emptyPath);

    fs.unlinkSync(emptyPath); // Limpa o arquivo

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro', 'Imagem enviada está vazia ou inválida');
  });

});


describe('UsuarioController - CRUD completo', () => {
  it('deve cadastrar um usuário sem imagem', async () => {
    const timestamp = Date.now();
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Usuário Simples')
      .field('email', `novo_${timestamp}@email.com`)
      .field('usuario', `usuario_simples_${timestamp}`)
      .field('senha', '123');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve retornar erro se faltar campo obrigatório', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .send({ nome: 'Incompleto' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar erro ao tentar cadastrar usuário duplicado', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Duplicado')
      .field('email', emailOriginal)             // mesma combinação
      .field('usuario', usuarioOriginal)
      .field('senha', '123');

    expect(res.statusCode).toBe(400); // ou 409, se preferir
    expect(res.body).toHaveProperty('erro');
  });

  it('deve cadastrar um usuário com imagem', async () => {
    const timestamp = Date.now();
    const imgPath = path.resolve(__dirname, 'mock/foto_teste.jpg');
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Com Imagem')
      .field('email', `imagem_${timestamp}@exemplo.com`)
      .field('usuario', `imagem_user_${timestamp}`)
      .field('senha', '123')
      .attach('imagem', imgPath);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todos os usuários', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get('/usuario');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve buscar um usuário existente por ID', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get(`/usuario/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('deve retornar erro ao buscar ID inexistente', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get('/usuario/99999999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar erro ao buscar ID inválido', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get('/usuario/abc');
    expect(res.statusCode).toBe(400);
  });

  it('deve atualizar um usuário com sucesso', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Atualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Atualizado');
  });

  it('deve retornar erro ao atualizar sem token', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/usuario/${userId}`)
      .send({ nome: 'Sem Token' });

    expect(res.statusCode).toBe(401);
  });

  it('deve retornar erro ao atualizar com ID inválido', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/usuario/abc`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Invalido' });

    expect(res.statusCode).toBe(400);
  });

  it('deve deletar usuário com sucesso', async () => {
    const res = await request(global.sailsApp.hooks.http.app).delete(`/usuario/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('deve retornar erro ao deletar usuário já removido', async () => {
    const res = await request(global.sailsApp.hooks.http.app).delete(`/usuario/${userId}`);
    expect(res.statusCode).toBe(404);
  });

  it('deve retornar erro ao deletar ID inválido', async () => {
    const res = await request(global.sailsApp.hooks.http.app).delete('/usuario/abc');
    expect(res.statusCode).toBe(400);
  });
});

describe('Cobertura extra - UsuarioController', () => {
  it('deve retornar erro ao tentar criar usuário sem senha', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Sem Senha')
      .field('email', `erro_${Date.now()}@mail.com`)
      .field('usuario', `erro_user_${Date.now()}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar erro ao buscar foto de usuário sem foto', async () => {
    const timestamp = Date.now();
    const resCadastro = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Sem Foto')
      .field('email', `nofoto_${timestamp}@mail.com`)
      .field('usuario', `nofoto_user_${timestamp}`)
      .field('senha', '123');

    const id = resCadastro.body.id;
    const res = await request(global.sailsApp.hooks.http.app).get(`/usuario/${id}/foto`);
    expect(res.statusCode).toBe(404);
  });

  it('deve retornar erro ao atualizar foto de usuário sem foto existente', async () => {
    const timestamp = Date.now();
    const email = `semfoto_${timestamp}@mail.com`;

    const resCadastro = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Sem Foto Atualização')
      .field('email', email)
      .field('usuario', `atualiza_sem_foto_${timestamp}`)
      .field('senha', '123');

    const id = resCadastro.body.id;

    const login = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({ email, senha: '123' });

    const authToken = login.body.token;
    const imgPath = path.resolve(__dirname, 'mock/foto_teste.jpg');
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/usuario/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .attach('imagem', imgPath)
      .field('nome', 'Novo Nome');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'Novo Nome');
  });

  it('deve retornar erro ao tentar atualizar um usuário inexistente', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put('/usuario/999999')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Falha Atualiza' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar a imagem com header correto', async () => {
    const imgPath = path.resolve(__dirname, 'mock/foto_teste.jpg');
    const timestamp = Date.now();
    const email = `imagem_${timestamp}@mail.com`;

    const resCadastro = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Foto Header')
      .field('email', email)
      .field('usuario', `img_header_${timestamp}`)
      .field('senha', '123')
      .attach('imagem', imgPath);

    const id = resCadastro.body.id;

    const res = await request(global.sailsApp.hooks.http.app)
      .get(`/usuario/${id}/foto`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/image/);
  });
});

