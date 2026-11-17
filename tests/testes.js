const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { JSDOM } = require("jsdom");

let dom;
let document;
let window;

beforeEach(() => {
    const html = fs.readFileSync("index.html", "utf8");

    dom = new JSDOM(html, {
        runScripts: "outside-only",
        url: "http://localhost"
    });

    window = dom.window;
    document = window.document;

    window.alert = () => {};
    window.HTMLElement.prototype.scrollIntoView = () => {};
    window.scrollTo = () => {};

    const script = fs.readFileSync("script.js", "utf8");
    window.eval(script);
});

test("Teste 1 - Verificar carregamento do formulário", () => {
    const formulario = document.getElementById("donation-form");

    assert.ok(formulario);
    assert.ok(document.getElementById("doacao"));
    assert.ok(document.getElementById("confirmacao"));
});

test("Teste 2 - Impedir envio com campos vazios", () => {
    const formulario = document.getElementById("donation-form");

    formulario.dispatchEvent(
        new window.Event("submit", {
            bubbles: true,
            cancelable: true
        })
    );

    assert.equal(
        document.getElementById("confirmacao").hidden,
        true
    );
});

test("Teste 3 - Processar doação demonstrativa", () => {
    document.getElementById("nome").value = "Maria Silva";
    document.getElementById("email").value = "maria@email.com";

    document.querySelector('input[name="valor"]').checked = true;
    document.querySelector('input[name="pagamento"]').checked = true;

    const formulario = document.getElementById("donation-form");

    formulario.dispatchEvent(
        new window.Event("submit", {
            bubbles: true,
            cancelable: true
        })
    );

    assert.equal(
        document.getElementById("confirmacao").hidden,
        false
    );

    assert.equal(
        document.getElementById("resumo-nome").textContent,
        "Maria Silva"
    );

    assert.equal(
        document.getElementById("resumo-email").textContent,
        "maria@email.com"
    );
});

test("Teste 4 - Retornar e limpar o formulário", () => {
    const formulario = document.getElementById("donation-form");

    document.getElementById("nome").value = "Maria Silva";

    document.getElementById("confirmacao").hidden = false;
    document.getElementById("doacao").hidden = true;

    document.getElementById("back-home").dispatchEvent(
        new window.Event("click", {
            bubbles: true,
            cancelable: true
        })
    );

    assert.equal(document.getElementById("confirmacao").hidden, true);
    assert.equal(document.getElementById("doacao").hidden, false);
    assert.equal(document.getElementById("nome").value, "");
});
