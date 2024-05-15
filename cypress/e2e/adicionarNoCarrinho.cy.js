function escolherProduto(indiceProduto) {
    cy.getIndexProduto(indiceProduto).click()
    cy.get('.modal-footer > .btn').click()
}

function preencherFormulario(nome, email) {
    cy.getDataQa('signup-name').type(nome)
    cy.getDataQa('signup-email').type(email)
}

function fazerCadastro(senha, dia, mes, ano, primeiroNome, ultimoName, endereco, pais, estado, cidade, CEP, numeroCelular) {
    cy.get('#id_gender1').click()
    cy.getDataQa('password').type(senha)
    cy.getDataQa('days').select(dia)
    cy.getDataQa('months').select(mes)
    cy.getDataQa('years').select(ano)
    cy.getDataQa('first_name').type(primeiroNome)
    cy.getDataQa('last_name').type(ultimoName)
    cy.getDataQa('address').type(endereco)
    cy.getDataQa('country').select(pais)
    cy.getDataQa('state').type(estado)
    cy.getDataQa('city').type(cidade)
    cy.getDataQa('zipcode').type(CEP)
    cy.getDataQa('mobile_number').type(numeroCelular)
    cy.getDataQa('create-account').click()
}

function fazerLogin(email, senha) {
    cy.getDataQa('login-email').type(email)
    cy.getDataQa('login-password').type(senha)
    cy.getDataQa('login-button').click()
}

function preencherDadosCartao(nomeCartao, numeroCartao, CVC, mesCartao, anoCartao) {
    cy.getDataQa('name-on-card').type(nomeCartao)
    cy.getDataQa('card-number').type(numeroCartao)
    cy.getDataQa('cvc').type(CVC)
    cy.getDataQa('expiry-month').type(mesCartao)
    cy.getDataQa('expiry-year').type(anoCartao)
    cy.getDataQa('pay-button').click()
}

describe('Testes da Função Carrinho de Compras', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        preencherFormulario('Testes em Cypress', 'email@exemplo.com')
        cy.getDataQa('signup-button').click()
        cy.get('.signup-form > form > p').then(($mensagemErro) => {
            if ($mensagemErro.length > 0) {
                fazerLogin('email@exemplo.com', 'senhaExemplo')
            } else {
                fazerCadastro('senhaExemplo', '24', 'March', '2005', 'Testes', 'Cypress', 'Jardim dos Testes', 'United States', 'Cypresslândia', 'City of Tests', '40028-922', '12345-6789')
                cy.getDataQa('account-created').should('exist')
            }
        })
        cy.get('.shop-menu > .nav > :nth-child(2)').click()
    })

    it('Permitir a adição de um produto no carrinho e verificar adicionou', () => {
        escolherProduto(3)
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.getListaCarrinho(1).should('exist')
    })

    it('Fazer a Compra do Produto Escolhido', () => {
        escolherProduto(3)
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.getListaCarrinho(1).should('exist')
        cy.get('.col-sm-6 > .btn').click()
        cy.get(':nth-child(7) > .btn').click()
        preencherDadosCartao('Testes Cypress', '1234567898765432', '999', '12', '2034')
        cy.getDataQa('order-placed').should('exist')
    })

    it('Bloquear compra caso os dados estejam errados', () => {
        escolherProduto(3)
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.getListaCarrinho(1).should('exist')
        cy.get('.col-sm-6 > .btn').click()
        cy.get(':nth-child(7) > .btn').click()
        preencherDadosCartao('Testes Cypress', '123', '9', '12', '44')
        cy.getDataQa('order-placed').should('not.exist')
    })

    it('Adicionar vários produtos no carrinho, verificar se estão lá e fazer as compras de todos os itens juntos', () => {
        const numeroProdutos = 7;
        for (let i = 3; i < 3 + numeroProdutos; i++) {
            escolherProduto(i);
        }
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
        cy.getListaCarrinho(numeroProdutos).should('exist')
        cy.get('.col-sm-6 > .btn').click()
        cy.get(':nth-child(7) > .btn').click()
        preencherDadosCartao('Testes Cypress', '1234567898765432', '999', '12', '2034')
        cy.getDataQa('order-placed').should('exist')
    })
});