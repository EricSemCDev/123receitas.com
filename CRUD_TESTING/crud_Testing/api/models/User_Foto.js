module.exports = {
    tableName: 'user_foto',
    primaryKey: 'usuario',
  
    attributes: {
      usuario: {
        model: 'usuario', // FK e PK ao mesmo tempo
        columnName: 'id', 
        required: true
      },
      user_foto: {
        type: 'ref',
        columnType: 'bytea',
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
  