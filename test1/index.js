/* eslint-disable no-console */
const somaHorasExtras = (salario, valorHorasExtras) => salario + valorHorasExtras;

const calculaDescontos = (salario, descontos) => salario - descontos;

const verifiqueSe = (valor) => {
  const assercoes = {
    ehExatamenteigualA(esperado) {
      if (valor !== esperado) {
      // eslint-disable-next-line no-throw-literal
        throw {};
      }
    },
  };
  return assercoes;
};

const teste = (titulo, funcaoDeTeste) => {
  try {
    funcaoDeTeste();
    console.log(`${titulo} passou`);
  } catch {
    console.log(`${titulo} não passou!!!`);
  }
};

teste('somaHorasExtras', () => {
  const esperando = 2500;
  const retornado = somaHorasExtras(2000, 500);

  verifiqueSe(retornado).ehExatamenteigualA(esperando);
});

teste('calculaDesconto', () => {
  const esperando = 2300;
  const retornado = calculaDescontos(2500, 200);

  verifiqueSe(retornado).ehExatamenteigualA(esperando);
});
