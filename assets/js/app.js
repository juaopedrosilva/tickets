// Selecionando os locais das informações no HTML
const elementListBug = document.querySelector('#list-bug')
const elementListCorrection = document.querySelector('#list-correction')
const elementListNew = document.querySelector('#list-new')
const elementListCompleted = document.querySelector('#list-completed')

let contentBug = ''
let contentCorrection = ''
let contentNew = ''
let contentCompleted = ''

// Automatizando as informações
function renderCard(e){
    return  `
            <div class="cards moderate">
                <h4>${e.title}</h4>
                <p>${e.description}</p>
                <span>${e.userName}</span>
            </div>
           `               
}

async function getAll(){
    
    const response = await fetch('http://192.168.1.108:9999/tickets')  // Faz a requisição
    const data = await response.json() // Converte os dados en json

    // Aqui filtramos e armazenamos em em const___
    const dataBugs = data.filter(element => element.type === 'bug')
    const dataCorrections = data.filter(element => element.type === 'correction')
    const dataNews = data.filter(element => element.type === 'news')
    const dataCompleteds = data.filter(element => element.type === 'completed')
    
    // Aqui mapeamos a filtragem e inserirmos as informações
    dataBugs.forEach(element => contentBug += renderCard(element))
    dataCorrections.forEach(element => contentCorrection += renderCard(element))
    dataNews.forEach(element => contentNew += renderCard(element))
    dataCompleteds.forEach(element => contentCompleted += renderCard(element))
   
    // Aqui inseimos as informações no HTML
    elementListBug.innerHTML += contentBug
    elementListCorrection.innerHTML += contentCorrection
    elementListNew.innerHTML += contentNew
    elementListCompleted.innerHTML += contentCompleted

    // Aqui inserimos as quant. cards por column
    elementListBug.querySelector('div.title > span').innerHTML = dataBugs.length
    elementListCorrection.querySelector('div.title > span').innerHTML = dataCorrections.length
    elementListNew.querySelector('div.title > span').innerHTML = dataNews.length
    elementListCompleted.querySelector('div.title > span').innerHTML = dataCompleteds.length
}


getAll()





