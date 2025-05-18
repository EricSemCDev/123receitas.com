const API_BASE_URL = 'http://localhost:1337'

export async function cadastrar(dados) {
  try {
    const formData = new FormData();

    formData.append('email', dados.email);
    formData.append('senha', dados.senha);
    formData.append('nome', dados.nomeCompleto);
    formData.append('usuario', dados.username);

    if (dados.foto) {
      formData.append('imagem', dados.imagem);
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
export async function login(dados) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro no login');
    }

    // Armazena o token (se existir)
    if (resultado.token) {
      localStorage.setItem('token', resultado.token);
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}
export async function editarPerfil(dados) {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('nome', dados.nome);
    formData.append('usuario', dados.usuario);
    formData.append('email', dados.email);

    if (dados.foto) {
      formData.append('imagem', dados.foto);
    }

    const response = await fetch(`${API_BASE_URL}/usuario/editar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao editar perfil');
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}
export async function criarReceita(dados) {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('titulo', dados.titulo);
    formData.append('descricao', dados.descricao);
    formData.append('modoPreparo', dados.modoPreparo);

    dados.categorias.forEach(cat => {
      formData.append('categorias[]', cat);
    });

    dados.fotos.forEach(foto => {
      formData.append('fotos', foto); // backend deve aceitar array de arquivos
    });

    const response = await fetch(`${API_BASE_URL}/receita`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao criar receita');
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}

export async function editarReceita(dados) {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('titulo', dados.titulo);
    formData.append('descricao', dados.descricao);
    formData.append('modoPreparo', dados.modoPreparo);

    dados.categorias.forEach(cat => {
      formData.append('categorias[]', cat);
    });

    dados.fotos.forEach(foto => {
      formData.append('fotos', foto);
    });

    const response = await fetch(`${API_BASE_URL}/receita/${dados.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao editar receita');
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}
//Separar filtro a filtro ou função global e identar strings?
export async function filtrarReceita(filtros) {
  try {
    const query = new URLSearchParams(filtros).toString();

    const response = await fetch(`${API_BASE_URL}/receitas?${query}`);

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao filtrar receitas');
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}
export async function buscaReceitaNome(nomeReceita) {
  try {
    const response = await fetch(`${API_BASE_URL}/receitas/busca?nome=${encodeURIComponent(nomeReceita)}`);

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro na busca de receitas');
    }

    return resultado;
  } catch (error) {
    throw error;
  }
}