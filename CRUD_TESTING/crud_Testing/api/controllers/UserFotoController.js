module.exports = {
    update: async function (req, res) {
      try {
        const usuarioId = req.params.id;
        if (!req.body.user_foto) {
          return res.status(400).json({ erro: 'Foto obrigatória' });
        }
        const fotoAtualizada = await User_Foto.updateOne({ usuario: usuarioId }).set({
          user_foto: req.body.user_foto
        });
        if (!fotoAtualizada) {
          return res.status(404).json({ erro: 'Foto não encontrada para este usuário' });
        }
  
        return res.json({ mensagem: 'Foto atualizada com sucesso', foto: fotoAtualizada });
  
      } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar foto', detalhes: error.message });
      }
    },
    findOne: async function (req, res) {
        try {
          const usuarioId = req.params.id;
    
          const foto = await User_Foto.findOne({ usuario: usuarioId });
          if (!foto) {
            return res.status(404).json({ erro: 'Foto não encontrada para este usuário' });
          }
          const fotoEmBase64 = foto.user_foto.toString('base64');
          return res.json({
            usuario: foto.usuario,
            foto: fotoEmBase64
          });          
        } catch (error) {
          return res.status(500).json({ erro: 'Erro ao buscar foto', detalhes: error.message });
        }
      }
  };
  