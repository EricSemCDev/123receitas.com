const fs = require('fs');

module.exports = {
    // Criar uma nova receita
    create: async function (req, res) {
      try {
        // --- CRIAR A RECEITA ---
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

        // --- UPLOAD DE FOTOS ---
        const arquivos = req.file('fotos');
        if (arquivos && arquivos._files.length > 0) {
          await new Promise((resolve, reject) => {
            arquivos.upload({
              maxBytes: 5 * 1024 * 1024, // 5MB por imagem
              dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/receitas')
            }, async function (err, uploadedFiles) {
              if (err) return reject(err);

              const fotosParaSalvar = uploadedFiles.slice(0, 4).map(file => ({
                receita: novaReceita.id,
                receita_foto: require('fs').readFileSync(file.fd)
              }));

              await ReceitaFoto.createEach(fotosParaSalvar);
              resolve();
            });
          });
        }

        // --- ASSOCIAÇÃO DE CATEGORIAS ---
        let categorias = req.body.categorias;

        if (categorias) {
          // Se não for array, transforma
          if (!Array.isArray(categorias)) {
            categorias = [categorias];
          }

          // Converter para números válidos
          categorias = categorias
            .map(c => parseInt(c))
            .filter(c => !isNaN(c));

          if (categorias.length > 0) {
            const categoriasAssociadas = categorias.map(categoriaId => ({
              receita: novaReceita.id,
              categoria: categoriaId
            }));

            await ReceitaCategorias.createEach(categoriasAssociadas);
          } else {
            console.warn('Nenhuma categoria válida foi fornecida.');
          }
        } else {
          console.warn('Nenhuma categoria foi enviada.');
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
        const receitas = await Receita.find()
          .populate('criador')
          .populate('fotos')
          .populate('categorias');

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


        const receitasCompletas = await Promise.all( 
          receitas.map(async(r) => {

            const userFoto = await User_Foto.findOne({ usuario: r.criador?.id });
            const userFotoUrl = userFoto ? `http://localhost:1337/usuario/${r.criador?.id}/foto` : null;

            // Validação e debug das categorias
            const nomesCategorias = (r.categorias || [])
              .map((c) => {
                if (!c.categoria) {
                  console.warn(`Categoria vazia para receita ${r.id}`, c);
                  return null;
                }
                const nome = categoriasPorId[c.categoria];
                if (!nome) {
                  console.warn(`Categoria ${c.categoria} não encontrada no dicionário`);
                }
                return nome;
              })
              .filter(Boolean);

            // Validação e debug das fotos
            const imagens = (r.fotos || []).map((f) => `http://localhost:1337/receita/foto/${f.id}`);

            return {
              id: r.id,
              titulo: r.titulo,
              dificuldade: r.dificuldade,
              tempo_preparo: r.tempo_preparo,
              user_foto: userFotoUrl, //falta esse
              imagemReceita: imagens,
              categorias: nomesCategorias,
              porcoes: r.porcoes,
              ingredientes: r.ingredientes,
              modo_preparo: r.modo_preparo,
            };
        }));

        return res.json(receitasCompletas);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
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
        const userFotoUrl = userFoto ? `http://localhost:1337/usuario/${userId}/foto` : null;

        // 4. Montar resultado final
        const receitasCompletas = receitas.map((r) => {
          // Validação e debug das categorias
          const nomesCategorias = (r.categorias || [])
            .map((c) => {
              if (!c.categoria) {
                console.warn(`Categoria vazia para receita ${r.id}`, c);
                return null;
              }
              const nome = categoriasPorId[c.categoria];
              if (!nome) {
                console.warn(`Categoria ${c.categoria} não encontrada no dicionário`);
              }
              return nome;
            })
            .filter(Boolean);

          // Validação e debug das fotos
          const imagens = (r.fotos || []).map((f) => `http://localhost:1337/receita/foto/${f.id}`);

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
              id: r.criador?.id,
              nome: r.criador?.nome,
              usuario: r.criador?.usuario,
            },

            categorias: nomesCategorias,
            imagens: imagens,
            user_foto: userFotoUrl,
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
        const id = req.params.id;

        const receita = await Receita.findOne({ id })
          .populate('criador')
          .populate('fotos')
          .populate('categorias');

        if (!receita) {
          return res.status(404).json({ erro: 'Receita não encontrada' });
        }

        // Buscar nome das categorias
        const categoriaIds = receita.categorias.map(c => c.categoria);
        const categoriasCompletas = await Categoria.find({ id: categoriaIds });

        const categoriasPorId = {};
        categoriasCompletas.forEach(c => {
          categoriasPorId[c.id] = c.nome_categoria;
        });

        const nomesCategorias = (receita.categorias || [])
          .map((c) => {
            if (!c.categoria) return null;
            return categoriasPorId[c.categoria];
          })
          .filter(Boolean);

        // Buscar foto do criador
        const userFoto = await User_Foto.findOne({ usuario: receita.criador?.id });
        const userFotoUrl = userFoto ? `http://localhost:1337/usuario/${receita.criador?.id}/foto` : null;

        // Montar imagens da receita
        const imagens = (receita.fotos || []).map((f) => `http://localhost:1337/receita/foto/${f.id}`);

        // Retorno final
        const receitaFormatada = {
          id: receita.id,
          titulo: receita.titulo,
          descricao: receita.descricao,
          modo_preparo: receita.modo_preparo,
          tempo_preparo: receita.tempo_preparo,
          porcoes: receita.porcoes,
          dificuldade: receita.dificuldade,
          ingredientes: receita.ingredientes,
          acessos: receita.acessos,
          createdAt: receita.createdAt,
          updatedAt: receita.updatedAt,

          criador: {
            id: receita.criador?.id,
            nome: receita.criador?.nome,
            usuario: receita.criador?.usuario,
          },

          categorias: nomesCategorias,
          imagens: imagens,
          user_foto: userFotoUrl,
        };

        return res.json(receitaFormatada);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
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
    },
    buscar: async function (req, res) {
      try {
        const { tempo, dificuldade, categoria } = req.query;

        // 🔐 Validações básicas
        if (tempo && isNaN(tempo)) {
          return res.status(400).json({ erro: 'Tempo deve ser um número' });
        }

        if (dificuldade && isNaN(dificuldade)) {
          return res.status(400).json({ erro: 'Dificuldade deve ser um número' });
        }

        if (categoria && isNaN(categoria)) {
          return res.status(400).json({ erro: 'Categoria deve ser um número' });
        }

        const whereClauses = [];
        const params = [];
        let joinCategoria = '';

        // 🔍 Filtro por tempo
        if (tempo) {
          params.push(parseInt(tempo));
          whereClauses.push(`r.tempo_preparo <= $${params.length}`);
        }

        // 🔍 Filtro por dificuldade
        if (dificuldade) {
          params.push(parseInt(dificuldade));
          whereClauses.push(`r.dificuldade = $${params.length}`);
        }

        // 🔍 Filtro por categoria via tabela intermediária
        if (categoria) {
          joinCategoria = `
            INNER JOIN "Receita_Categorias" rc ON rc.receita_id = r.id
          `;
          params.push(parseInt(categoria));
          whereClauses.push(`rc.categoria_id = $${params.length}`);
        }

        const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        const sql = `
          SELECT DISTINCT r.* 
          FROM "Receita" r
          ${joinCategoria}
          ${whereSQL}
        `;

        const resultado = await Receita.getDatastore().sendNativeQuery(sql, params);

        return res.json(resultado.rows);

      } catch (erro) {
        console.error('Erro na busca:', erro);
        return res.status(500).json({ erro: 'Erro interno no servidor.' });
      }
    }
  }
