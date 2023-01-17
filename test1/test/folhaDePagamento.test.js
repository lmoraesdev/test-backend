import { somaHorasExtras, calculaDescontos } from '../index';

test('Deve retornar a soma das horas extras', () => {
  const esperando = 2500;
  const retornar = somaHorasExtras(2000,500);

  expect(retornar).toBe(esperando);
});

test('Deve Desconta o valor do salario', () => {
  const esperando = 2300;
  const retornar = calculaDescontos(2500, 200);

  expect(retornar).toBe(esperando);
});
