const bcrypt = require('bcrypt');
const User_Foto = require('../models/User_Foto');

console.log("TESTE DE LOG - ao carregar o controller");

module.exports = {
    // Criar um novo usuário
    create: async function (req, res) {
      try {
        if(!req.body.senha) {
          return res.status(400).json({ erro: 'Senha Obrigatória'})
        }
        const saltRounds = 10
        const hashPW = await bcrypt.hash(req.body.senha, saltRounds)
        req.body.senha = hashPW

        const novoUsuario = await Usuario.create(req.body).fetch();

        if (req.body.user_foto) {
          try {
            const bufferFoto = Buffer.from(req.body.user_foto, 'base64');
            await User_Foto.create({
              id: novoUsuario.id,
              user_foto: bufferFoto
            });
          } catch (e) {
            return res.status(400).json({ erro: 'Erro ao processar a imagem enviada.' });
          }
        }

        const { senha, ...usuarioSemSenha } = novoUsuario;
        return res.status(201).json(usuarioSemSenha);
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
        const usuarioAtualizado = await Usuario.updateOne({ id: req.params.id }).set(req.body);
        const { senha, ...usuarioAttSemSenha } = usuarioAtualizado;
        if (!usuarioAttSemSenha) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json(usuarioAttSemSenha);
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
    }
  };
  