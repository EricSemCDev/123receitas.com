module.exports = {
    create: async function (req, res) {
      try {
        if (!req.body.receita || !req.body.foto) {
          return res.status(400).json({ erro: 'ID da receita e a foto são obrigatórios' });
        }
    
        const novaFoto = await Receita_Foto.create({
          receita: req.body.receita,
          receita_foto: Buffer.from(req.body.foto, 'base64')
        }).fetch();
    
        return res.status(201).json(novaFoto);
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao adicionar foto', detalhes: error.message });
      }
    },
    update: async function (req, res) {
      try {
        const receitaId = req.params.id;
        if (!req.body.receita_foto) {
          return res.status(400).json({ erro: 'Foto obrigatória' });
        }
  
        const bufferFoto = Buffer.from(req.body.receita_foto, 'base64');
  
        const fotoAtualizada = await Receita_Foto.updateOne({ receita: receitaId }).set({
          receita_foto: bufferFoto
        });
  
        if (!fotoAtualizada) {
          return res.status(404).json({ erro: 'Foto não encontrada para esta receita' });
        }
  
        return res.json({ mensagem: 'Foto atualizada com sucesso', foto: fotoAtualizada });
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar foto', detalhes: error.message });
      }
    },
  
    findAll: async function (req, res) {
        try {
          const receitaId = req.params.id;
    
          const fotos = await Receita_Foto.find({ receita: receitaId });
          if (!fotos || fotos.length === 0) {
            return res.status(404).json({ erro: 'Nenhuma foto encontrada para esta receita' });
          }
    
          const fotosEmBase64 = fotos.map(foto => ({
            id: foto.id,
            receita: foto.receita,
            foto: foto.receita_foto.toString('base64')
          }));
    
          return res.json(fotosEmBase64);
        } catch (error) {
          return res.status(500).json({ erro: 'Erro ao buscar fotos', detalhes: error.message });
        }
    }
  };
  