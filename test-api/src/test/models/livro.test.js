import {
  describe, expect, it, jest,
} from '@jest/globals';
import Livro from '../../models/livro.js';

describe('Testando o modelo Livro', () => {
  const objetoLivro = {
    titulo: 'CDC',
    paginas: 250,
    editora_id: 1,
    autor_id: 1,
  };

  it('Deve instanciar uma nova editora', () => {
    const livro = new Livro(objetoLivro);

    expect(livro).toEqual(expect.objectContaining(objetoLivro));
  });

  it.skip('Deve salvar editora no DB', () => {
    const livro = new Livro(objetoLivro);
    livro.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it.skip('Deve Salvar no DB usando a sintaxe moderna', async () => {
    const livro = new Livro(objetoLivro);
    const dados = await livro.salvar();
    const retornado = await Livro.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoLivro,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const livro = new Livro(objetoLivro);

    livro.salvar = jest.fn().mockReturnValue({
      id: 10,
      titulo: 'CDC',
      paginas: 250,
      editora_id: 1,
      autor_id: 1,
      created_at: '2023-1-19',
      updated_at: '2023-1-19',
    });

    const retorno = livro.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoLivro,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
