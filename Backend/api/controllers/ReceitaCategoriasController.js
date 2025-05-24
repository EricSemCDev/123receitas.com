module.exports = {
    create: async function (req, res) {
      try {
        const novaAssociacao = await ReceitaCategorias.create({
          receita: req.body.receita,
          categoria: req.body.categoria
        }).fetch();

        return res.status(201).json(novaAssociacao);
      } catch (error) {
        console.error(error); // <- Adiciona isso aqui
        return res.status(500).json({ erro: 'Erro ao criar associação', detalhes: error.message });
      }
    },
  
    findAll: async function (req, res) {
      try {
        const associacoes = await ReceitaCategorias.find().populate('receita').populate('categoria');
        return res.json(associacoes);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar associações', detalhes: error.message });
      }
    },
  
    delete: async function (req, res) {
      try {
        const id = req.params.id;
        const associacaoRemovida = await ReceitaCategorias.destroyOne({ id });
  
        if (!associacaoRemovida) {
          return res.status(404).json({ erro: 'Associação não encontrada' });
        }
  
        return res.json({ mensagem: 'Associação removida com sucesso' });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao remover associação', detalhes: error.message });
      }
    }
  };
  