module.exports.models = {
  // Configura o comportamento dos modelos em relação à migração de esquemas de banco de dados
  migrate: 'safe', // ou 'alter' para ajustar automaticamente o esquema do banco de dados, 'safe' para não alterar

  // Chave de encriptação para dados
  dataEncryptionKeys: {
    default: '9/IA2QIagNO9vebGrw0rKhpOmlk/FPASHwnrtxmcZVs='
  },

  // Comportamento ao destruir um modelo
  cascadeOnDestroy: true, // Ao excluir um modelo, as referências a ele também são apagadas automaticamente
};
