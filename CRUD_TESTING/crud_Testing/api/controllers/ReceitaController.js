/**
 * ReceitaController.js
 */

module.exports = {
    // Criar uma nova receita
    create: async function (req, res) {
      try {
        const novaReceita = await Receita.create(req.body).fetch();
        return res.status(201).json(novaReceita);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar receita', detalhes: error.message });
      }
    },
  
    // Buscar todas as receitas
    findAll: async function (req, res) {
      try {
        const receitas = await Receita.find().populate('criador'); // inclui dados do criador
        return res.json(receitas);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar receitas', detalhes: error.message });
      }
    },
  
    // Buscar uma receita específica pelo ID
    findOne: async function (req, res) {
      try {
        const receita = await Receita.findOne({ id: req.params.id }).populate('criador');
        if (!receita) {
          return res.status(404).json({ erro: 'Receita não encontrada' });
        }
        return res.json(receita);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar receita', detalhes: error.message });
      }
    },
  
    // Atualizar uma receita
    update: async function (req, res) {
      try {
        const receitaAtualizada = await Receita.updateOne({ id: req.params.id }).set(req.body);
        if (!receitaAtualizada) {
          return res.status(404).json({ erro: 'Receita não encontrada' });
        }
        return res.json({ mensagem: 'Receita atualizada com sucesso', receita: receitaAtualizada });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar receita', detalhes: error.message });
      }
    },
  
    // Deletar uma receita
    delete: async function (req, res) {
      try {
        const receitaRemovida = await Receita.destroyOne({ id: req.params.id });
        if (!receitaRemovida) {
          return res.status(404).json({ erro: 'Receita não encontrada' });
        }
        return res.json({ mensagem: 'Receita removida com sucesso' });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao remover receita', detalhes: error.message });
      }
    }
  };
  