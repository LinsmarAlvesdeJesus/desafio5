// compare.js

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image){
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;    
    }

    exibirInfo() {
        console.log(`Nome: ${this.nome}, Preço: ${this.preco}, Motor: ${this.motor}, Potência: ${this.potencia}`);
    }
} 

// Instâncias dos carros disponíveis
let carroXL = new Car(
    "Ranger XL", 
    "R$ 165.055,00", 
    "511mm", 
    "1.884mm", 
    "233mm", 
    "1250kg", 
    "2.0 turbo diesel", 
    "170CV", 
    "1876 litros", 
    "aro 17'", 
    "img/XL Cabine.jpg"
);

let carroXLS = new Car(
    "Ranger XLS", 
    "R$ 167.250,00", 
    "511mm", 
    "1086mm", 
    "232mm", 
    "1076kg", 
    "2.0 turbo diesel", 
    "170cv", 
    "1876 litros", 
    "aro 17'", 
    "img/xls 2.2 diesel.jpg"
);

let carroStorm = new Car(
    "Ranger Storm", 
    "R$ 184.912,00", 
    "511mm", 
    "1821mm", 
    "1821mm", 
    "1040kg", 
    "3.2 diesel", 
    "200cv", 
    "1180 litros", 
    "aro 17'", 
    "img/storm.jpg"
);

// Array de todos os carros disponíveis (útil se você quiser listá-los ou gerá-los dinamicamente no HTML)
const availableCars = [carroXL, carroXLS, carroStorm];

// Array armazena os carros selecionados e faz a comparação.
// incializa vazio e é manipulado através da função SetCarToCompare.
let carsToCompare = []; 

// mostra as informações dos carros no console 
carroXL.exibirInfo();
carroXLS.exibirInfo();
carroStorm.exibirInfo();



// Função para encontrar a posição do carro no array pelo nome
// Retorna o índice do carro se encontrado, ou -1 se não encontrado.
function getCarPositionInArray(arr, carClass) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].nome === carClass.nome) {
            return i;
        }
    }
    return -1;
}

// manitora a adição/remoção de carros no array de comparação 
// 'el' é o elemento HTML (checkbox) que inicializou a mudança
// 'carClass' é o objeto Car associado nesse checkbox
function SetCarToCompare(el, carClass) {
    // confirma que o argumento é realmente um tipo Car
    if(!(carClass instanceof Car)){ 
        throw new Error("O segundo argumento precisa ser uma instância da classe Car.");
    }
    // A CHAVE QUE ESTAVA AQUI FOI REMOVIDA
    
    // Encontra a posição do carro no array de carros selecionados
    const position = getCarPositionInArray(carsToCompare, carClass);

    if(el.checked){ // Se o checkbox foi marcado (tentando adicionar o carro)
        // Impede a seleção caso houver 2 carros selecionados na lista de comparação
        if(carsToCompare.length >= 2){
            alert("Você pode comparar no máximo 2 carros. Desmarque um para selecionar outro.");
            el.checked = false; // Desmarca o checkbox para visualmente mostrar que não foi selecionado
            return; // Sai da função para não adicionar o carro       
        } // Esta chave fecha o if(carsToCompare.length >= 2)
        
        // Acrescenta o carro ao array caso ainda não estiver lá
        if(position === -1){
            carsToCompare.push(carClass);
            console.log(`Carro ${carClass.nome} adicionado para comparação.`);
        }
    } else { // Se o checkbox foi desmarcado (tentando remover o carro)
        // Remove o carro do array caso ele estiver lá
        if(position !== -1){
            carsToCompare.splice(position, 1); // Remove um elemento na posição 'position'
            console.log(`Carro ${carClass.nome} removido da comparação.`);
        }
    }
    console.log("Carros para comparar atualmente:", carsToCompare.map(car => car.nome));
} // ESTA É A CHAVE CORRETA QUE FECHA A FUNÇÃO SetCarToCompare

// Exibe a tabela de comparação, com validações da quantia de carros
function ShowCompare() {
    // Faz a verificação da quantidade de carros selecionados e exibe alertas apropriados
    if(carsToCompare.length === 0) {
        alert("Nenhum carro selecionado. Por favor, selecione pelo menos 1 carro para comparar.");
        return;
    } else if (carsToCompare.length === 1) {
        alert("Selecione 2 carros para fazer uma comparação. Atualmente, apenas 1 carro está selecionado.");
        return;
    } else if (carsToCompare.length > 2) {
        // Esta é uma salvaguarda. 
        alert("Você selecionou mais de 2 carros. Por favor, selecione exatamente 2 carros para comparar.");
        return;
    }

    // Se a validação passou (exatamente 2 carros selecionados), atualiza e mostra a tabela
    UpdateCompareTable(); 
    document.getElementById("compare").style.display = "block"; // Torna a div de comparação visível
}

// Esconde a tabela de comparação
function HideCompare(){
    document.getElementById("compare").style.display = "none"; 
}

// Preenche ou atualiza o conteúdo da tabela de comparação no HTML
function UpdateCompareTable() {
    const tableHeader = document.getElementById("compareTableHeader");
    const tableBody = document.getElementById("compareTableBody");

    // Limpa o cabeçalho e o corpo da tabela para recriar
    tableHeader.innerHTML = '<th>Característica</th>'; // Mantém o cabeçalho fixo 'Característica'
    tableBody.innerHTML = '';

    // Adiciona os nomes dos carros selecionados ao cabeçalho da tabela
    carsToCompare.forEach(car => {
        const th = document.createElement('th');
        th.textContent = car.nome;
        tableHeader.appendChild(th);
    });

    // --- Seção para a Imagem do Carro ---
    // Cria uma nova linha para as imagens dos carros
    const imageRow = document.createElement('tr');
    const imageLabelTd = document.createElement('td');
    imageLabelTd.textContent = 'Imagem'; // Label para a linha de imagens
    imageRow.appendChild(imageLabelTd);

    carsToCompare.forEach(car => {
        const tdImage = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = car.image; // Define o caminho da imagem
        imgElement.alt = `Imagem do ${car.nome}`; // Texto alternativo para acessibilidade
        imgElement.style.width = '150px'; // Define a largura da imagem na tabela
        imgElement.style.height = 'auto'; // Mantém a proporção da imagem
        tdImage.appendChild(imgElement);
        imageRow.appendChild(tdImage);
    });
    tableBody.appendChild(imageRow); // Adiciona a linha de imagens ao corpo da tabela
    // --- Fim da Seção para a Imagem ---

    // Define quais características serão exibidas na tabela e seus rótulos
    const features = [
        { key: 'preco', label: 'Preço' },
        { key: 'alturaCacamba', label: 'Altura da Caçamba' },
        { key: 'alturaVeiculo', label: 'Altura do Veículo' },
        { key: 'alturaSolo', label: 'Altura do Solo' },
        { key: 'capacidadeCarga', label: 'Capacidade de Carga' },
        { key: 'motor', label: 'Motor' },
        { key: 'potencia', label: 'Potência' },
        { key: 'volumeCacamba', label: 'Volume da Caçamba' },
        { key: 'roda', label: 'Roda' },
        // Adicione outras propriedades da classe Car aqui se quiser que apareçam na comparação
    ];

    // Preenche o corpo da tabela com os dados das características dos carros
    features.forEach(feature => {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        tdLabel.textContent = feature.label; // Rótulo da característica (ex: "Preço")
        tr.appendChild(tdLabel);

        carsToCompare.forEach(car => {
            const tdValue = document.createElement('td');
            // Acessa o valor da propriedade do carro usando feature.key (ex: car.preco)
            tdValue.textContent = car[feature.key]; 
            tr.appendChild(tdValue);
        });
        tableBody.appendChild(tr); // Adiciona a linha de característica ao corpo da tabela
    });
}