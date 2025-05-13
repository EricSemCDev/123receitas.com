module.exports = {
  tableName: 'Categoria',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true
    },
    nome_categoria: {
      type: 'string',
      columnType: 'character varying(20)',
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
    receitas: {
      collection: 'ReceitaCategorias',
      via: 'categoria'
    }
  }
};
