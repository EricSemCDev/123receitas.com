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

  //Rotas Tabela Receita
  'POST /receita': 'ReceitaController.create',
  'GET /receita': 'ReceitaController.findAll',
  'GET /receita/:id': 'ReceitaController.findOne',
  'PUT /receita/:id': 'ReceitaController.update',
  'DELETE /receita/:id': 'ReceitaController.delete',

  //Rotas Tabela ReceitaFoto
  'PUT /receita_foto/:id': 'ReceitaFotoController.update',
  'GET /receita_foto/:id': 'ReceitaFotoController.findAll',

};
