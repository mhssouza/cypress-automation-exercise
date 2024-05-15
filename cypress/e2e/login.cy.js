function fazerLogin(email, senha) {
    cy.getDataQa('login-email').type(email)
    cy.getDataQa('login-password').type(senha)
    cy.getDataQa('login-button').click()
}

describe('Testes em função de Login', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    })

    it('Permitir fazer Login com os dados corretos', () => {
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        fazerLogin('email@exemplo.com', 'senhaExemplo')
        cy.get('.shop-menu > .nav > :nth-child(5)').should('exist')
    })

    it('Não permitir fazer login com uma conta inexistente', () =>{
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        fazerLogin('contaQueNaoExiste@gmail.com', 'contaFake402')
        cy.get('.login-form > form > p').should('exist')
    })
})