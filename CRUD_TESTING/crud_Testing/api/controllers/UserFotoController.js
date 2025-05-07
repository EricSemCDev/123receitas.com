module.exports = {
    create: async function (req, res) {
      try {
        if (!req.body.usuario) {
          return res.status(400).json({ erro: 'Usuário é obrigatório para associar a foto' });
        }

        if (!req.body.foto_usuario) {
          return res.status(400).json({ erro: 'Foto do usuário é obrigatória' });
        }

        const bufferFoto = Buffer.from(req.body.foto_usuario, 'base64');

        const novaFoto = await User_Foto.create({
          usuario: req.body.usuario, 
          user_foto: bufferFoto   
        }).fetch();

        return res.status(201).json(novaFoto);

      } catch (error) {
        console.error('Erro ao criar foto:', error);
        return res.status(500).json({ erro: 'Erro ao criar foto', detalhes: error.message });
      }
    },
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
  