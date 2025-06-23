const Sails = require('sails');
const request = require('supertest');

beforeAll((done) => {
  Sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' }
  }, async (err, server) => {
    global.sailsApp = server;

    // Cria um usuário fixo para os testes
    const timestamp = Date.now();
    const email = `global_${timestamp}@example.com`;

    const res = await request(global.sailsApp.hooks.http.app)
      .post('/usuario')
      .field('nome', 'Usuário Global')
      .field('email', email)
      .field('usuario', `usuario_global_${timestamp}`)
      .field('senha', '123');

    global.usuarioId = res.body.id;

    const login = await request(global.sailsApp.hooks.http.app)
      .post('/auth/login')
      .send({
        email,
        senha: '123'
      });

    global.token = login.body.token;

    done(err);
  });
});

afterAll((done) => {
  if (global.sailsApp) return Sails.lower(done);
  return done();
});
