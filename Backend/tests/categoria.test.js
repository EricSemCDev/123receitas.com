const request = require('supertest');

let categoriaId;

beforeAll(async () => {
  // Cria uma categoria para testes de leitura, atualização e exclusão
  const res = await request(global.sailsApp.hooks.http.app)
    .post('/categoria')
    .send({ nome_categoria: 'Categoria Teste CRUD' });

  categoriaId = res.body.id;
});

describe('CategoriaController - CRUD completo', () => {
  it('deve criar uma nova categoria', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/categoria')
      .send({ nome_categoria: 'Categoria Nova' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('nome_categoria', 'Categoria Nova');
  });

  it('deve retornar todas as categorias', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get('/categoria');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve buscar uma categoria por ID', async () => {
    const res = await request(global.sailsApp.hooks.http.app).get(`/categoria/${categoriaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', categoriaId);
  });

  it('deve atualizar o nome da categoria', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .put(`/categoria/${categoriaId}`)
      .send({ nome_categoria: 'Categoria Atualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body.categoria).toHaveProperty('nome_categoria', 'Categoria Atualizada');
  });

  it('deve deletar a categoria', async () => {
    const res = await request(global.sailsApp.hooks.http.app).delete(`/categoria/${categoriaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('deve retornar 404 ao tentar deletar categoria novamente', async () => {
    const res = await request(global.sailsApp.hooks.http.app).delete(`/categoria/${categoriaId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });
});
