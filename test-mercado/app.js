import Carrinho from './carrinho.js';
import Item from './item.js';

const carrinho = new Carrinho();

carrinho.adiciona(new Item('Maça', 1, 3));
carrinho.adiciona(new Item('Banana', 1.4, 5));
carrinho.adiciona(new Item('Melancia', 2, 1));
carrinho.adiciona(new Item('Uva', 4.3, 2));
carrinho.adiciona(new Item('Açai', 3, 5));

carrinho.adicionaFrete(15);

carrinho.calculaSubtotal();

carrinho.finalizaCompra();

console.log(carrinho);
