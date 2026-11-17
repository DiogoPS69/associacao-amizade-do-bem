// ==========================================
// ASSOCIAÇÃO AMIZADE DO BEM
// Sistema demonstrativo de doações
// ==========================================


// ELEMENTOS DO SITE
const donationForm = document.getElementById("donation-form");

const donationSection = document.getElementById("doacao");
const confirmationSection = document.getElementById("confirmacao");

const backHomeButton = document.getElementById("back-home");


// ==========================================
// PROCESSAMENTO DA DOAÇÃO
// ==========================================

donationForm.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Captura os dados do formulário
    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const valor = document.querySelector(
        'input[name="valor"]:checked'
    );

    const pagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    );


    // VALIDAÇÃO DOS DADOS

    if (!nome || !email || !valor || !pagamento) {

        alert("Por favor, preencha todos os campos.");

        return;
    }


    // FORMATAÇÃO DO VALOR
    const valorFormatado = Number(valor.value).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );


    // CAPTURA DA DATA
    const dataAtual = new Date().toLocaleDateString("pt-BR");


    // ==========================================
    // PREENCHIMENTO DA CONFIRMAÇÃO
    // ==========================================

    document.getElementById("resumo-nome").textContent = nome;

    document.getElementById("resumo-email").textContent = email;

    document.getElementById("resumo-valor").textContent = valorFormatado;

    document.getElementById("resumo-pagamento").textContent = pagamento.value;

    document.getElementById("resumo-data").textContent = dataAtual;


    // MENSAGEM DE CONFIRMAÇÃO
    document.getElementById("confirmation-message").textContent =
        "Obrigado, " + nome +
        "! Sua contribuição de " + valorFormatado +
        " foi registrada em nossa demonstração.";


    // ==========================================
    // MUDANÇA DE TELA
    // ==========================================

    donationSection.hidden = true;

    confirmationSection.hidden = false;


    // Leva o usuário até a confirmação
    confirmationSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ==========================================
// VOLTAR PARA A PÁGINA INICIAL
// ==========================================

backHomeButton.addEventListener("click", function(event) {

    event.preventDefault();

    // Esconde a confirmação
    confirmationSection.hidden = true;

    // Mostra novamente a área de doação
    donationSection.hidden = false;

    // Limpa os dados preenchidos
    donationForm.reset();

    // Retorna ao início
    window.location.hash = "inicio";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================================
// FIM DO SCRIPT
// ==========================================

console.log("Associação Amizade do Bem carregada com sucesso!");
console.log("Sistema demonstrativo de doações iniciado.");
