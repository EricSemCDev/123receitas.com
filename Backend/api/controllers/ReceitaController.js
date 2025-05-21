const fs = require('fs');

module.exports = {
    // Criar uma nova receita
    create: async function (req, res) {
      try {
        // Criar a receita no banco
        const novaReceita = await Receita.create({
          titulo: req.body.titulo,
          descricao: req.body.descricao,
          modo_preparo: req.body.modo_preparo,
          tempo_preparo: parseInt(req.body.tempo_preparo),
          dificuldade: parseInt(req.body.dificuldade),
          porcoes: parseInt(req.body.porcoes),
          criador: req.body.criador,
          ingredientes: req.body.ingredientes
        }).fetch();
    
        // --- TRATAMENTO DAS FOTOS (arquivos reais) ---
        const arquivos = req.file('fotos');
        if (arquivos && arquivos._files.length > 0) {
          await new Promise((resolve, reject) => {
            arquivos.upload({
              maxBytes: 5 * 1024 * 1024, // 5MB máx por imagem
              dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/receitas')
            }, async function (err, uploadedFiles) {
              if (err) return reject(err);
    
              // Limitar a 4 fotos no máximo
              const fotosParaSalvar = uploadedFiles.slice(0, 4).map(file => ({
                receita: novaReceita.id,
                receita_foto: require('fs').readFileSync(file.fd)
              }));
    
              await ReceitaFoto.createEach(fotosParaSalvar);
              resolve();
            });
          });
        }
    
        // --- CATEGORIAS ASSOCIADAS ---
        if (req.body.categorias) {
          let categorias = req.body.categorias

          if (typeof categorias === 'string') {
            try {
              categorias = JSON.parse(categorias)
            } catch (e) {
              console.warn('Categorias veio como string mal formatada: ', req.body.categorias)
              categorias = []
            }
          }
          
          if (Array.isArray(categorias)) {
            const categoriasAssociadas = categorias.map(categoriaId => ({
              receita: novaReceita.id,
              categoria: parseInt(categoriaId)
            }));
            await ReceitaCategorias.createEach(categoriasAssociadas);
          } else {  
            console.warn('Nenhuma categoria associada ou o formato está incorreto');
          }
        }
        
        return res.status(201).json(novaReceita);
    
      } catch (error) {
        console.error('Erro ao criar receita:', error);
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
    findAllByUser: async function (req, res) {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({ erro: 'ID do usuário é obrigatório' });
      }

      try {
        // 1. Buscar receitas com populates diretos
        const receitas = await Receita.find({ criador: userId })
          .populate('criador')
          .populate('categorias')  // vai conter array de objetos com categoria: ID
          .populate('fotos');      // vai conter array de imagens

        // 2. Buscar todas as categorias referenciadas
        const categoriaIds = [
          ...new Set(
            receitas.flatMap(r =>
              r.categorias.map(c => c.categoria)
            )
          )
        ];

        const categoriasCompletas = await Categoria.find({ id: categoriaIds });
        const categoriasPorId = {};
        categoriasCompletas.forEach(c => {
          categoriasPorId[c.id] = c.nome_categoria;
        });

        // 3. Buscar a imagem do usuário
        const userFoto = await User_Foto.findOne({ usuario: userId });
        const userFotoBase64 = userFoto?.user_foto?.toString('base64') || null;

        // 4. Montar resultado final
        const receitasCompletas = receitas.map(r => {
          const nomesCategorias = r.categorias
            .map(c => categoriasPorId[c.categoria])
            .filter(Boolean);

          const imagensBase64 = r.fotos.map(f => f.receita_foto.toString('base64'));

          return {
            id: r.id,
            titulo: r.titulo,
            descricao: r.descricao,
            modo_preparo: r.modo_preparo,
            tempo_preparo: r.tempo_preparo,
            porcoes: r.porcoes,
            dificuldade: r.dificuldade,
            ingredientes: r.ingredientes,
            acessos: r.acessos,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,

            criador: {
              id: r.criador.id,
              nome: r.criador.nome,
              usuario: r.criador.usuario,
            },

            categorias: nomesCategorias,
            imagens: imagensBase64,
            user_foto: userFotoBase64
          };
        });

        return res.json(receitasCompletas);
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
    //Busca das fotos pelo ID de uma receita
    getById: async function (req, res) {
      try {
        const id = parseInt(req.params.id);
    
        const receita = await Receita.findOne({ id })
          .populate('fotos')
          .populate('categorias');
    
        if (!receita) {
          return res.status(404).json({ erro: 'Receita não encontrada' });
        }
    
        // Converter as fotos binárias em base64
        if (receita.fotos && receita.fotos.length > 0) {
          receita.fotos = receita.fotos.map(foto => {
            return {
              id: foto.id,
              receita: foto.receita,
              receita_foto: Buffer.from(foto.receita_foto).toString('base64')
            };
          });
        }
    
        return res.json(receita);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
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
  