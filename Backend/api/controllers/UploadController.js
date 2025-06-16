const path = require('path');

module.exports = {
  testeUpload: function (req, res) {
    req.file('imagem').upload({
      dirname: path.resolve(sails.config.appPath, 'assets/uploads')
    }, function (err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.badRequest('Nenhuma imagem foi enviada.');
      }
      return res.json({
        message: 'Upload realizado com sucesso!',
        files: uploadedFiles
      });
    });
  }
};
