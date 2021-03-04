onload = () => {
    document.querySelector('#btn-0').onclick = () => num(0);
    document.querySelector('#btn-1').onclick = () => num(1);
    document.querySelector('#btn-2').onclick = () => num(2);
    document.querySelector('#btn-3').onclick = () => num(3);
    document.querySelector('#btn-4').onclick = () => num(4);
    document.querySelector('#btn-5').onclick = () => num(5);
    document.querySelector('#btn-6').onclick = () => num(6);
    document.querySelector('#btn-7').onclick = () => num(7);
    document.querySelector('#btn-8').onclick = () => num(8);
    document.querySelector('#btn-9').onclick = () => num(9);
    document.querySelector('#btn-comma').onclick = virgula;
    document.querySelector('#btn-reset').onclick = clear;
    document.querySelector('#btn-sum').onclick = () => operador('+');
    document.querySelector('#btn-sub').onclick = () => operador('-');
    document.querySelector('#btn-mult').onclick = () => operador('*');
    document.querySelector('#btn-div').onclick = () => operador('/');
    document.querySelector('#btn-equals').onclick = calcular;
}

let valorDoDisplay;
let novoNum = true;
let valorAnterior = 0;
let operacaoPendente = null;

const updateVisor = () => {
    let [parteInt, parteDec] = valorDoDisplay.split(',');
    let v = '';
    c=0;
    for(let i=parteInt.length - 1; i>=0; i--){
        if(++c>3){
            v = '.'+v;
            c = 1;
        }
        v = parteInt[i] + v;
    }
    v = v + (parteDec ? ',' + parteDec : '');
    document.querySelector('#display').innerHTML = v;
};

const num = (n) => {
    if (novoNum) {
        valorDoDisplay = '' + n;
        novoNum = false;
    } else valorDoDisplay += n;
    updateVisor();
};

const virgula = () => {
    if(novoNum){
        valorDoDisplay = '0,';
        novoNum = false;
    } else if(valorDoDisplay.indexOf(',') == -1) valorDoDisplay += ',';
    updateVisor();
};

const clear = () => {
    novoNum = true;
    valorAnterior = 0;
    valorDoDisplay = '0';
    operacaoPendente = null;
    updateVisor();
};

const valorAtual = () => parseFloat(valorDoDisplay.replace(',','.'));

const operador = (op) => {
    calcular();
    valorAnterior = valorDoDisplay;
    operacaoPendente = op;
    novoNum = true;
};

const calcular = () => {
    if(operacaoPendente != null){
        let resultado = 0;
        switch(operacaoPendente){
            case '+': resultado = Number(valorAnterior) + valorAtual(); break;
            case '-': resultado = Number(valorAnterior) - valorAtual(); break;
            case '*': resultado = Number(valorAnterior) * valorAtual(); break;
            case '/': resultado = Number(valorAnterior) / valorAtual(); break;
        }
        valorDoDisplay = resultado.toString().replace('.',',');
    }
    novoNum = true;
    operacaoPendente = null;
    valorAnterior = 0;
    updateVisor();
};