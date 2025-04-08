const bcrypt = require('bcrypt')

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
        const usuariosSemSenha = usuarios.map(({ senha, ...resto }) => resto);
        return res.json(usuariosSemSenha);
      } catch (error) {
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
        const usuarioAtualizado = await Usuario.updateOne({ id: req.params.id }).set(req.body);
        if (!usuarioAtualizado) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json(usuarioAtualizado);
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
  