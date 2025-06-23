const request = require('supertest');

let token;

beforeAll(async () => {
  const timestamp = Date.now();
  const email = `auth_${timestamp}@example.com`;

  await request(global.sailsApp.hooks.http.app)
    .post('/usuario')
    .field('nome', 'Usuário Login')
    .field('email', email)
    .field('usuario', `usuario_auth_${timestamp}`)
    .field('senha', '123');

  const login = await request(global.sailsApp.hooks.http.app)
    .post('/auth/login')
    .send({
      email,
      senha: '123'
    });

  token = login.body.token;
});

describe('Login de Usuário', () => {
  it('deve realizar login com sucesso e retornar token', async () => {
    const timestamp = Date.now();
    const email = `login_sucesso_${timestamp}@example.com`;

    await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Teste Login')
      .field('email', email)
      .field('usuario', `user_login_${timestamp}`)
      .field('senha', '123');

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({ email, senha: '123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
    expect(res.body).toHaveProperty('usuario');
    expect(res.body.usuario).toHaveProperty('email', email);
  });

  it('deve falhar com senha incorreta', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({
        email: 'teste@example.com',
        senha: 'senhaErrada'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve falhar com usuário inexistente', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({
        email: 'inexistente@example.com',
        senha: '123'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve falhar se email ou senha não forem enviados', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('Validação de Sessão (GET /auth/me)', () => {
  it('deve retornar informações do usuário autenticado', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
  });

  it('deve falhar se não enviar token', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .get('/auth/me');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro');
  });
});
