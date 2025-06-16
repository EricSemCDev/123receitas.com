module.exports = {
    create: async function (req, res) {
      try {
        if (!req.body.nome_categoria) {
          return res.status(400).json({ erro: 'Nome da categoria é obrigatório.' });
        }
  
        const novaCategoria = await Categoria.create({
          nome_categoria: req.body.nome_categoria
        }).fetch();
  
        return res.status(201).json(novaCategoria);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar categoria', detalhes: error.message });
      }
    },
  
    findAll: async function (req, res) {
      try {
        const categorias = await Categoria.find().select(['id', 'nome_categoria']);
        return res.json(categorias);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar categorias', detalhes: error.message });
      }
    },
    
    findOne: async function (req, res) {
      try {
        const categoria = await Categoria.findOne({ id: req.params.id });
        if (!categoria) {
          return res.status(404).json({ erro: 'Categoria não encontrada' });
        }
        return res.json(categoria);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar categoria', detalhes: error.message });
      }
    },
  
    update: async function (req, res) {
      try {
        const categoriaAtualizada = await Categoria.updateOne({ id: req.params.id }).set({
          nome_categoria: req.body.nome_categoria
        });
  
        if (!categoriaAtualizada) {
          return res.status(404).json({ erro: 'Categoria não encontrada' });
        }
  
        return res.json({ mensagem: 'Categoria atualizada com sucesso', categoria: categoriaAtualizada });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar categoria', detalhes: error.message });
      }
    },
  
    delete: async function (req, res) {
      try {
        const categoriaRemovida = await Categoria.destroyOne({ id: req.params.id });
        if (!categoriaRemovida) {
          return res.status(404).json({ erro: 'Categoria não encontrada' });
        }
        return res.json({ mensagem: 'Categoria removida com sucesso' });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao remover categoria', detalhes: error.message });
      }
    }
  };
  