module.exports = {
  tableName: 'user_foto',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'serial'
    },
    usuario: {
      model: 'usuario',
      columnName: 'usuario',
      required: true
    },
    foto_usuario: {
      type: 'ref',
      columnType: 'bytea'
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
