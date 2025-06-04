const API_BASE_URL = 'http://localhost:1337'

export async function cadastrar(dados) {
  try {
    const formData = new FormData();

    formData.append('email', dados.email);
    formData.append('senha', dados.senha);
    formData.append('nome', dados.nomeCompleto);
    formData.append('usuario', dados.username);

    if (dados.imagem) {
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
export async function login(email, senha) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
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
    
    if (dados.imagem) {
      formData.append('imagem', dados.imagem);
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
export async function buscarUsuarioLogado() {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Usuário não está autenticado.');

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao buscar usuário logado');
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
    formData.append('descricao', "Uma receita de desastre"); //trocar para dados.descricao depois
    formData.append('modo_preparo', dados.modoPreparo);
    formData.append('tempo_preparo', dados.tempoPreparo);
    formData.append('dificuldade', dados.dificuldade);
    formData.append('criador', dados.criador);
    formData.append('ingredientes', dados.ingredientes);
    formData.append('porcoes', dados.porcoes);

    dados.categorias.forEach(cat => {
      formData.append('categorias', cat);
    });

    console.log("Imagens a serem enviadas:", dados.imagens);
    dados.imagens.forEach(imagens => {
      formData.append('fotos', imagens);
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
export async function buscaTodasReceitas() {
  try {
    const response = await fetch(`${API_BASE_URL}/receita/todas`, {
      method: 'GET'
    })

    const resultado = await response.json()

    return resultado
  } catch (error) {
    throw error;
  }
}
export async function buscaReceitaID() {
  try {
    const loggedUser = await buscarUsuarioLogado()

    //Pelo id de loggedUser, cria bsuca em receita
    const response = await fetch(`${API_BASE_URL}/receita/usuario/${loggedUser.id}`, {
      method: 'GET',
    })
    if(!response.ok) {
      throw new Error(`Erro ao buscar receitas: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e)
  }
}
export async function buscaReceitaPorIdReceita(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/receita/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.erro || `Erro ao buscar receita: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Erro ao buscar receita por ID:", e);
    throw e;
  }
}
export async function buscarReceitasPorFiltro({ tempo, dificuldade, categoria }) {
  const params = [];

  if (tempo) {
    params.push(`tempoMax=${encodeURIComponent(tempo)}`);
  }
  if (dificuldade) {
    params.push(`dificuldadeMax=${encodeURIComponent(dificuldade)}`);
  }
  if (categoria) {
    params.push(`categoria=${encodeURIComponent(categoria)}`);
  }

  const queryString = params.join("&");

  try {
    const response = await fetch(`${API_BASE_URL}/receitas/buscar?${queryString}`);
    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || "Erro na busca");
    }

    return resultado;
  } catch (error) {
    console.error("Erro na busca por filtro:", error);
    throw error;
  }
}
export async function buscaReceitaNome(nomeReceita) {
  try {
    const response = await fetch(`${API_BASE_URL}/receitas/buscar?query=${encodeURIComponent(nomeReceita)}`);

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro na busca de receitas');
    }

    return resultado;
  } catch (error) {
    console.error("Erro na busca de receitas:", error);
    throw error;
  }
}
export async function buscarCategorias() {
  try {
    const response = await fetch(`${API_BASE_URL}/categoria`);
    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.erro || 'Erro ao buscar categorias');
    }

    const categoriasValidas = resultado.filter(c => c?.id && c?.nome_categoria);

    return categoriasValidas;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error.message);
    throw error;
  }
}
