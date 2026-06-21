import { ServicoDePagamento } from '../src/ServicoDePagamento.js';
import  assert from 'node:assert';
describe('ServicoDePagamento', function() {
    let servicoDePagamento; 
    beforeEach(function() {
        servicoDePagamento = new ServicoDePagamento(); 
    });
    it('deve realizar um pagamento e consultar o último pagamento', function() {
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        assert.deepStrictEqual(ultimoPagamento, {
            codigoBarras: '0987-7656-3475',
            empresa: 'Samar',
            valor: 156.87,
            categoria: 'cara'
        });
    }); 
    it('deve classificar o pagamento como padrão quando o valor for menor ou igual a 100.00', function() {
        servicoDePagamento.pagar('1234-5678-9012', 'Samar', 50.00);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();  
        assert.deepStrictEqual(ultimoPagamento, {
            codigoBarras: '1234-5678-9012',
            empresa: 'Samar',
            valor: 50.00,
            categoria: 'padrão'
        });
    });
    it('deve classificar o pagamento como cara quando o valor for maior que 100.00', function() {
        servicoDePagamento.pagar('5678-9012-3456', 'Samar', 150.00);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();     
        assert.deepStrictEqual(ultimoPagamento, {
            codigoBarras: '5678-9012-3456',
            empresa: 'Samar',
            valor: 150.00,
            categoria: 'cara'
        });
    });
    it('deve retornar null ao consultar o último pagamento quando não houver pagamentos', function() {
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        assert.equal(ultimoPagamento, null);
    }); 
});

