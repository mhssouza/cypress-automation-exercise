Cypress.Commands.add('getDataQa', (seletor) => {
    return cy.get(`[data-qa=${seletor}]`)
})

Cypress.Commands.add('getIndexProduto', (selector) => {
    return cy.get(`:nth-child(${selector}) > .product-image-wrapper > .single-products > .productinfo > .btn`)
})

Cypress.Commands.add('getListaCarrinho', (selector) => {
    return cy.get(`#product-${selector}`)
})