module.exports = {
  tableName: 'User_foto',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'serial'
    },
    usuario: {
      model: 'usuario',
      required: true
    },
    user_foto: {
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
