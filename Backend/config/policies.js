module.exports.policies = {
  UsuarioController: {
    create: true,
    update: 'isAuthorized',
    find: 'isAuthorized'
  },
  AuthController: {
    login: true,
    me: 'isAuthorized'
  }
};