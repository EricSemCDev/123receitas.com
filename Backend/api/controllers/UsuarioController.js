const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = {
  create: async function (req, res) {
    try {
      if (!req.body.nome || !req.body.email || !req.body.usuario || !req.body.senha) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos' });
      }
      if (!req.body.nome || !req.body.email || !req.body.usuario || !req.body.senha) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos' });
      }


      const existente = await Usuario.findOne({
        or: [
          { email: req.body.email },
          { usuario: req.body.usuario }
        ]
      });
      if (existente) {
        return res.status(400).json({ erro: 'Email ou usuário já cadastrado' });
      }

      const saltRounds = 10;
      req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);

      const novoUsuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        usuario: req.body.usuario,
        senha: req.body.senha
      }).fetch();

      req.file('imagem').upload({}, async (err, arquivos) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao fazer upload da imagem.' });
        }

        if (arquivos && arquivos.length > 0) {
          const path = arquivos[0].fd;
          const bufferFoto = fs.readFileSync(path);

          if (!bufferFoto || bufferFoto.length === 0) {
            return res.status(400).json({ erro: 'Imagem enviada está vazia ou inválida' });
          }

          await User_Foto.create({
            usuario: novoUsuario.id,
            user_foto: bufferFoto
          });
        }

        const { senha, ...usuarioSemSenha } = novoUsuario;
        return res.status(201).json(usuarioSemSenha);
      });

    } catch (error) {
      console.error('[UsuarioController] Erro ao criar usuário:', error);
      return res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
    }
  },

  findAll: async function (req, res) {
    try {
      const usuarios = await Usuario.find();
      const usuariosSemSenha = usuarios.map(usuario => {
        const { senha, ...restante } = usuario;
        return restante;
      });
      return res.json(usuariosSemSenha);
    } catch (error) {
      console.error('[UsuarioController] Erro ao buscar usuários:', error);
      return res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: error.message });
    }
  },

  findOne: async function (req, res) {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({ erro: 'ID inválido' });
      }

      const usuario = await Usuario.findOne({ id: req.params.id });
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      const { senha, ...usuarioSemSenha } = usuario;
      return res.json(usuarioSemSenha);
    } catch (error) {
      console.error('[UsuarioController] Erro ao buscar usuário:', error);
      return res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: error.message });
    }
  },

  update: async function (req, res) {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({ erro: 'ID inválido' });
      }

      if (req.body.senha) {
        const saltRounds = 10;
        req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
      }

      req.file('imagem').upload({}, async (err, arquivos) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro no upload de imagem.' });
        }

        if (arquivos && arquivos.length > 0) {
          const path = arquivos[0].fd;
          const bufferFoto = fs.readFileSync(path);

          const fotoExistente = await User_Foto.findOne({ usuario: req.params.id });
          if (fotoExistente) {
            await User_Foto.updateOne({ usuario: req.params.id }).set({ user_foto: bufferFoto });
          } else {
            await User_Foto.create({ usuario: req.params.id, user_foto: bufferFoto });
          }
        }

        const usuarioAtualizado = await Usuario.updateOne({ id: req.params.id }).set(req.body);
        if (!usuarioAtualizado) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        const { senha, ...usuarioAttSemSenha } = usuarioAtualizado;
        return res.json(usuarioAttSemSenha);
      });
    } catch (error) {
      console.error('[UsuarioController] Erro ao atualizar usuário:', error);
      return res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
    }
  },

  delete: async function (req, res) {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({ erro: 'ID inválido' });
      }

      const usuarioRemovido = await Usuario.destroyOne({ id: req.params.id });
      if (!usuarioRemovido) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      return res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error('[UsuarioController] Erro ao deletar usuário:', error);
      return res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: error.message });
    }
  },

  foto: async function (req, res) {
    try {
      const userId = req.params.id;
      const foto = await User_Foto.findOne({ usuario: userId });

      if (!foto || !foto.user_foto) {
        return res.status(404).send("Foto não encontrada.");
      }

      res.set("Content-Type", "image/jpeg");
      return res.send(foto.user_foto);
    } catch (error) {
      console.error('[UsuarioController] Erro ao buscar foto:', error);
      return res.status(500).json({ erro: "Erro ao buscar imagem", detalhes: error.message });
    }
  }
};
