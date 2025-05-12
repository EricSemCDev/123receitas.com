module.exports = {
  tableName: 'Receitas_Categorias',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
    categoria: {
      model: 'Categoria',
      required: true,
    },
    receita: {
      model: 'Receita',
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
