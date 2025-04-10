module.exports = {
  tableName: 'receita_categorias',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
    categoria: {
      model: 'categoria',
      columnName: 'id_categoria',
      required: true,
    },
    receita: {
      model: 'receita',
      columnName: 'id_receita',
      required: true,
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
    }
  }
};
