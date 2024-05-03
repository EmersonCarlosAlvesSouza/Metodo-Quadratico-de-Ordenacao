const { performance } = require('perf_hooks');

function metodoQuadraticoOrdenacao() {
    // Passo 1: Definir o tamanho do vetor e preencher com números aleatórios
    const tamanho = 100000000;
    const inicio = performance.now();
    let vetorOriginal = [];
    
    for (let i = 0; i < tamanho; i++) {
        vetorOriginal.push(Math.floor(Math.random() * 100)); // Alterado para 100 para gerar números maiores
    }
    //console.log("\nVetor Original: " + vetorOriginal.join(' '));
    // Passo 2: Calcular o tamanho dos sub-vetores
    const tamanhoSubvetores = Math.sqrt(tamanho);

    // Passo 3: Criar e preencher os sub-vetores
    let subvetores = [];
    for (let i = 0; i < tamanho; i += tamanhoSubvetores) {
        subvetores.push(vetorOriginal.slice(i, i + tamanhoSubvetores));
    }

    // Passo 4: Ordenar cada sub-vetor com o método bubblesort
    for (let i = 0; i < subvetores.length; i++) {
        subvetores[i] = bubbleSort(subvetores[i]);
    }

    // Passo 5: Exibir os sub-vetores ordenados
    /*console.log("Sub-vetores:");
    for (let i = 0; i < subvetores.length; i++) {
        console.log("vetor-" + (i + 1) + " = [" + subvetores[i].join(', ') + "]");
    }*/

    // Passo 6: Comparar os maiores elementos de cada parte e inserir no vetor auxiliar
    let vetorAuxiliar = [];
    while (true) {
        let max = Number.MIN_SAFE_INTEGER;
        let maxIndex = -1;
        for (let i = 0; i < subvetores.length; i++) {
            if (subvetores[i].length > 0 && subvetores[i][subvetores[i].length - 1] > max) {
                max = subvetores[i][subvetores[i].length - 1];
                maxIndex = i;
            }
        }
        if (maxIndex === -1) break;
        vetorAuxiliar.push(max);
        //console.log("\nVetor Auxiliar: " + vetorAuxiliar.join(', '));
        //console.log("Removido " + max + " do vetor-" + (maxIndex + 1));
        subvetores[maxIndex].pop();
        //console.log("Sub-vetores após remoção:");
        /*for (let i = 0; i < subvetores.length; i++) {
            console.log("vetor-" + (i + 1) + " = [" + subvetores[i].join(', ') + "]");
        }*/
    }



    // Exibir vetor original e vetor auxiliar
    //console.log("\nVetor Original: " + vetorOriginal.join(' '));
    console.log("\nTamanho: " + tamanho);
    console.log("\nVetor Ordenado\n");
    const fim = performance.now();
    const tempoExecucao = fim - inicio;
    console.log("Tempo de execução: " + tempoExecucao.toFixed(2) + " milissegundos");
}

// Função de ordenação bubblesort
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Chamar a função para testar
metodoQuadraticoOrdenacao();


/**
 * tempos:
 * 10^4 = 19.94 milissegundos
 * 10^5 = 125.44 milissegundos
 * 10^6 = 14029.12 milissegundos
 * 10^7 = 664228.34 milissegundos
 * 10^8 = 27896442.70 milissegundos
 * 
 */