const request = require('supertest');

let token;
let usuarioId;
let receitaId;
let categoriaId;
let associacaoId;

beforeAll(async () => {
  const timestamp = Date.now();
  const email = `test_receita_categorias_${timestamp}@example.com`;

  // Cria usuário
  await request(global.sailsApp.hooks.http.app)
    .post('/usuario')
    .field('nome', 'Usuário Global')
    .field('email', email)
    .field('usuario', `usuario_global_${timestamp}`)
    .field('senha', '123');

  // Faz login
  const login = await request(global.sailsApp.hooks.http.app)
    .post('/auth/login')
    .send({ email, senha: '123' });

  token = login.body.token;
  usuarioId = login.body.usuario.id;

  // Cria categoria
  const categoria = await request(global.sailsApp.hooks.http.app)
    .post('/categoria')
    .send({ nome_categoria: 'Categoria Teste' });

    console.log('categoria.body:', categoria.body);
  categoriaId = categoria.body.id;

  // Cria receita
const path = require('path');

const receita = await request(sailsApp.hooks.http.app)
  .post('/receita')
  .set('Authorization', `Bearer ${token}`)
  .field('titulo', 'Receita Assoc')
  .field('descricao', 'Descrição de teste.')
  .field('modo_preparo', 'Misture tudo.')
  .field('tempo_preparo', 30)
  .field('porcoes', 2)
  .field('dificuldade', 1)
  .field('ingredientes', 'Ingrediente 1, Ingrediente 2')
  .field('criador', usuarioId)
  .attach('fotos', path.resolve(__dirname, 'mock', 'foto_receita.jpg')); // esse nome deve ser igual ao seu arquivo


  receitaId = receita.body.id;
}, 30000);

describe('ReceitaCategoriasController - Associação entre receitas e categorias', () => {
  it('deve criar uma associação com sucesso', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/receita-categorias')
      .send({
        receita: receitaId,
        categoria: categoriaId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    associacaoId = res.body.id;
  });

  it('deve retornar todas as associações', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get('/receita-categorias');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve deletar uma associação com sucesso', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .delete(`/receita-categorias/${associacaoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('deve retornar 404 ao tentar deletar uma associação inexistente', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .delete(`/receita-categorias/999999`);

    expect(res.statusCode).toBe(404);
  });
});
