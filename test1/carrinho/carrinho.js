class Carrinho {
  constructor() {
    this.itens = [];
    this.subtotal = null;
    this.frente = null;
    this.total = null;
  }

  adiciona(item) {
    this.itens.push(item);
  }

  adicionaFrente(valor) {
    this.frente = valor;
  }

  calculaTotal() {
    this.subtotal = this.itens.reduce((acum, item) => acum + item.pagaValorTotalItem(), 0);
    return this.subtotal + this.frente;
  }

  finalizaCompra() {
    if (this.itens.length === 0) {
      throw new Error('Carrinho de compras vazia');
    }
    this.total = this.calculaTotal();

    return {
      subtotal: this.subtotal,
      frente: this.frente,
      total: this.total,
    };
  }
}

export default Carrinho;
