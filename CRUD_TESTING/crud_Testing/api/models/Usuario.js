module.exports = {
  tableName: 'Usuario',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      columnType: 'serial',
      autoIncrement: true,
    },
    nome: {
      type: 'string',
      columnType: 'character varying(50)',
      required: true,
    },
    email: {
      type: 'string',
      columnType: 'character varying(50)',
      required: true,
      unique: true,
    },
    usuario: {
      type: 'string',
      columnType: 'character varying(50)',
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
    },
    senha: {
      type: 'string',
      required: true,
      protect: true,
      columnType: 'character varying(255)'
    }
  },

  datastore: 'default',
};
