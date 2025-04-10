module.exports.routes = {
  //Rotas Tabela Usuário
  'POST /usuario': 'UsuarioController.create',
  'GET /usuario': 'UsuarioController.findAll',
  'GET /usuario/:id': 'UsuarioController.findOne',
  'PUT /usuario/:id': 'UsuarioController.update',
  'DELETE /usuario/:id': 'UsuarioController.delete',
  
  //Rotas Tabela UserFoto
  'PUT /user_foto/:id': 'UserFotoController.update',
  'GET /user_foto/:id': 'UserFotoController.findOne',
};
