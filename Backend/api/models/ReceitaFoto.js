module.exports = {
  tableName: 'Receita_Foto',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
    receita_foto: {
      type: 'ref',
      columnType: 'bytea',
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
    receita: {
      model: 'receita',
      columnName: 'id_receita',
      required: true
    },
  }
};
