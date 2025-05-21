module.exports = {
  tableName: 'Receita',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
    titulo: {
      type: 'string',
      columnType: 'character varying(50)',
      required: true
    },
    descricao: {
      type: 'string',
      columnType: 'character varying(400)',
    },
    modo_preparo: {
      type: 'string',
      columnType: 'text',
      required: true
    },
    tempo_preparo: {
      type: 'number',
      columnType: 'integer',
      required: true
    },
    porcoes: {
      type: 'number',
      columnType: 'integer',
      required: true
    },
    acessos: {
      type: 'number',
      columnType: 'integer',
      defaultsTo: 0
    },
    dificuldade: {
      type: 'number',
      columnType: 'integer',
      required: true
    },
    ingredientes: {
      type: 'string',
      columnType: 'text',
      required: true
    },
    createdAt: {
      type: 'ref',
      columnType: 'timestamp without time zone',
      autoCreatedAt: true
    },
    updatedAt: {
      type: 'ref',
      columnType: 'timestamp without time zone',
      autoUpdatedAt: true
    },
    //Chaves estrangeiras
    criador: {
      model: 'usuario',
      required: true
    },

    //Habilita '.populate'
    //const receitaComFotos = await Receita.findOne({ id: 1 }).populate('fotos'); -- Comando exemplo para populate individual
    //===========================================================
    //=========== COMANDO EXEMPLO PARA POPULATE DUPLO ===========
    //===========================================================
    //const receita = await Receita.findOne({ id: req.params.id })
    //.populate('categorias')
    //.populate('fotos');
    //===========================================================
    fotos: {
      collection: 'ReceitaFoto',
      via: 'receita',
    },
    categorias: {
      collection: 'ReceitaCategorias',
      via: 'receita'
    }
  },
};

