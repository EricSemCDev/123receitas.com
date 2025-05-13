module.exports.policies = {
  UsuarioController: {
    create: true, // Registro é público
    update: 'isAuthorized', // Alterar perfil exige login
    find: 'isAuthorized'
  },
  AuthController: {
    login: true,
    me: 'isAuthorized'
  }
};