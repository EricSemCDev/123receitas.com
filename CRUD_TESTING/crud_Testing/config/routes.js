module.exports.routes = {
  'POST /usuario': 'UsuarioController.create',
  'GET /usuario': 'UsuarioController.find',
  'GET /usuario/:id': 'UsuarioController.findOne',
  'PUT /usuario/:id': 'UsuarioController.update',
  'DELETE /usuario/:id': 'UsuarioController.delete',
};
