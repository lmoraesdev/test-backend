import request from 'supertest';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3002;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /autores', () => {
  it('Deve retornar uma lista de autores', async () => {
    const resposta = await request(app)
      .get('/autores')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].nome).toEqual('JRR Tolkien');
  });
});

let idResposta;

describe('POST em /autores', () => {
  it('Deve adicionar uma nova livro', async () => {
    const resposta = await request(app)
      .post('/autores')
      .send({
        nome: 'Mario Cortella',
        nacionalidade: 'brasileiro',
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/autores').send({}).expect(400);
  });
});

describe('GET em /autores/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app).get(`/autores/${idResposta}`).expect(200);
  });
});

describe('PUT em /autores/id', () => {
  test.each([
    ['nome', { nome: 'Mario Cortella' }],
    ['nacionalidade', { nacionalidade: 'brasileiro' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao
      .request(app)
      .put(`/autores/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /autores/id', () => {
  it('Deletar o recurso adcionado', async () => {
    await request(app).delete(`/autores/${idResposta}`).expect(200);
  });
});
