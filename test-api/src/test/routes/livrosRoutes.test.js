import request from 'supertest';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /livros', () => {
  it('Deve retornar uma lista de livros', async () => {
    const resposta = await request(app)
      .get('/livros')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].titulo).toEqual('O Hobbit');
  });
});

let idResposta;

describe('POST em /livros', () => {
  it('Deve adicionar uma nova livro', async () => {
    const resposta = await request(app)
      .post('/livros')
      .send({
        titulo: 'CDC',
        paginas: 250,
        editora_id: 1,
        autor_id: 1,
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/livros').send({}).expect(400);
  });
});

describe('GET em /livros/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app).get(`/livros/${idResposta}`).expect(200);
  });
});

describe('PUT em /livros/id', () => {
  test.each([
    ['titulo', { titulo: 'Casa do Codigo' }],
    ['paginas', { paginas: 250 }],
    ['editora_id', { editora_id: 1 }],
    ['autor_id', { autor_id: 1 }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao
      .request(app)
      .put(`/livros/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /livros/id', () => {
  it('Deletar o recurso adcionado', async () => {
    await request(app).delete(`/livros/${idResposta}`).expect(200);
  });
});
