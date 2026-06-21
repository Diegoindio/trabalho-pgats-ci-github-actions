export class ServicoDePagamento {
    constructor() {
        this.pagamentos = [];
    }       
    pagar(codigoBarras, empresa, valor) {
        const pagamento = {
            codigoBarras,
            empresa,
            valor,
            categoria: valor > 100.00 ? 'cara' : 'padrão' // Define a categoria com base no valor do pagamento
        };
        this.pagamentos.push(pagamento); // Adiciona o pagamento à lista de pagamentos
    }   
    consultarUltimoPagamento() {
        if (this.pagamentos.length === 0) {
            return null; // Retorna null se não houver pagamentos
        }     return this.pagamentos[this.pagamentos.length - 1];   // Retorna o último pagamento realizado
    }   
}
