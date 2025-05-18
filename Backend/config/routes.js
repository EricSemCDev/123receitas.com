module.exports.routes = {
  //Rotas Tabela Usuário
  'POST /usuario': 'UsuarioController.create',
  'GET /usuario': 'UsuarioController.findAll',
  'GET /usuario/:id': 'UsuarioController.findOne',
  'PUT /usuario/:id': 'UsuarioController.update',
  'DELETE /usuario/:id': 'UsuarioController.delete',
  
  //Rotas Tabela UserFoto
  'POST /user_foto': 'UserFotoController.create',
  'PUT /user_foto/:id': 'UserFotoController.update',
  'GET /user_foto/:id': 'UserFotoController.findOne',

  //Rotas Tabela Receita
  'POST /receita': 'ReceitaController.create',
  'GET /receita': 'ReceitaController.findAll',
  'GET /receita/:id': 'ReceitaController.findOne',
  'GET /receita/detalhes/:id': 'ReceitaController.getById',
  'PUT /receita/:id': 'ReceitaController.update',
  'DELETE /receita/:id': 'ReceitaController.delete',

  //Rotas Tabela ReceitaFoto
  'PUT /receita_foto/:id': 'ReceitaFotoController.update',
  'GET /receita_foto/:id': 'ReceitaFotoController.findAll',

  //Rotas Tabela Categoria
  'POST /categoria': 'CategoriaController.create',
  'GET /categoria': 'CategoriaController.findAll',
  'GET /categoria/:id': 'CategoriaController.findOne',
  'PUT /categoria/:id': 'CategoriaController.update',
  'DELETE /categoria/:id': 'CategoriaController.delete',

  //Rotas Tabela ReceitaCategorias
  'POST /receita-categorias': 'ReceitaCategoriasController.create',
  'GET /receita-categorias': 'ReceitaCategoriasController.findAll',
  'DELETE /receita-categorias/:id': 'ReceitaCategoriasController.delete',

  //Rotas AuthController
  'POST /auth/login': 'AuthController.login',

  //Rotas de TESTE
  'POST /uploadTeste': 'UploadController.testeUpload',


};
