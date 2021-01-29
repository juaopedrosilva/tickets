const elementListBugs = document.getElementById("list-bugs")
const elementListCorrection = document.getElementById("list-correction")
const elementListNews = document.getElementById("list-news")
const elementListCompleted = document.getElementById("list-completed")

//console.log(elementListBugs)

function render() {

}
let contentBugs = ''
let contentCorrection = ''
let contentCompleted = ''
let contentNews = ''

async function getAll(){
    const response = await fetch('http://192.168.1.108:3000/tickets')
    const data = await response.json()

    /* CARD COLUMN BUGS */
    
    data.filter(element => element.type === 'bug').forEach(element => {
        contentBugs += `
        <div class="cards moderate">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <span>${element.userName}</span>
        </div>
      `
    })
    
    elementListBugs.innerHTML += contentBugs

    /* CARD COLUMN CORRECTION */
   
    data.filter(element => element.type === 'correction').forEach(element => {
        contentCorrection += `
        <div class="cards moderate">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <span>${element.userName}</span>
        </div>
      `                                 
    })
    elementListCorrection.innerHTML += contentCorrection

    /* CARD COLUMN NEWS */
    
    data.filter(element => element.type === 'news').forEach(element => {
        contentNews += `
        <div class="cards moderate">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <span>${element.userName}</span>
        </div>
        `
    })
    elementListNews.innerHTML += contentNews

    /* CARD COLUMN COMPLETED */
    
    data.filter(element => element.type === 'completed').forEach(element => {
        contentCompleted += `
        <div class="cards moderate">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <span>${element.userName}</span>
        </div>
        `
    })
    elementListCompleted.innerHTML += contentCompleted
}
getAll()





