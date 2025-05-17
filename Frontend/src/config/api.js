const API_BASE_URL = 'http://localhost:1337'

export async function cadastrar(dados) {
  try {
    const formData = new FormData();

    formData.append('email', dados.email);
    formData.append('senha', dados.senha);
    formData.append('nome', dados.nomeCompleto);
    formData.append('usuario', dados.username);

    if (dados.foto) {
      formData.append('imagem', dados.foto);
    }

    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: 'POST',
      body: formData
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao cadastrar');
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}