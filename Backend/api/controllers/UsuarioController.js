const bcrypt = require('bcrypt');

module.exports = {
    // Criar um novo usuário
    create: async function (req, res) {
      try {
        if (!req.body.senha) {
          return res.status(400).json({ erro: 'Senha obrigatória' });
        }

        const saltRounds = 10;
        const hashPW = await bcrypt.hash(req.body.senha, saltRounds);
        req.body.senha = hashPW;

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

          if (!arquivos || arquivos.length === 0) {
          } else {
            const fs = require('fs');
            const path = arquivos[0].fd;
            const bufferFoto = fs.readFileSync(path);

            await User_Foto.create({
              usuario: novoUsuario.id,
              user_foto: bufferFoto
            });
          }

          const { senha, ...usuarioSemSenha } = novoUsuario;
          return res.status(201).json(usuarioSemSenha);
        });

      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
      }
    },
  
    // Listar todos os usuários
    findAll: async function (req, res) {
      try {
        const usuarios = await Usuario.find();

        console.log('Usuarios: ', usuarios)

        const usuariosSemSenha = usuarios.map(usuario => {
          const { senha, ...restante } = usuario;
          return restante;
        });
        return res.json(usuariosSemSenha);
      } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
        return res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: error.message });
      }
    },
  
    // Buscar um usuário por ID
    findOne: async function (req, res) {
      try {
        const usuario = await Usuario.findOne({ id: req.params.id });
        if (!usuario) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        const { senha, ...usuarioSemSenha } = usuario;
        return res.json(usuarioSemSenha);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: error.message });
      }
    },
  
    // Atualizar um usuário por ID
    update: async function (req, res) {
      try {
        if (req.body.senha) {
          const bcrypt = require('bcrypt');
          const saltRounds = 10;
          req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
        }

        req.file('imagem').upload({}, async (err, arquivos) => {
          if (err) {
            return res.status(500).json({ erro: 'Erro no upload de imagem.' });
          }

          // Se uma nova imagem foi enviada, atualiza ou cria
          if (arquivos && arquivos.length > 0) {
            const fs = require('fs');
            const path = arquivos[0].fd;
            const bufferFoto = fs.readFileSync(path);

            await User_Foto.updateOne({ usuario: req.usuario.id }).set({
              user_foto: bufferFoto
            });
          }

          // Atualiza os dados do usuário
          const usuarioAtualizado = await Usuario.updateOne({ id: req.usuario.id }).set(req.body);
          const { senha, ...usuarioAttSemSenha } = usuarioAtualizado;

          if (!usuarioAttSemSenha) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
          }

          return res.json(usuarioAttSemSenha);
        });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
      }
    },
    // Deletar um usuário por ID
    delete: async function (req, res) {
      try {
        const usuarioRemovido = await Usuario.destroyOne({ id: req.params.id });
        if (!usuarioRemovido) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json({ mensagem: 'Usuário deletado com sucesso' });
      } catch (error) {
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

      res.set("Content-Type", "image/jpeg"); // ou image/png se preferir
      return res.send(foto.user_foto);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar imagem", detalhes: error.message });
    }
  }
  };
  