const fs = require("fs");
const http = require("http");
const url = require("url");

const tempOverView =  fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard     =  fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct  =  fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

const renderCard = (template, item)=>{
    let card = template.replace(/{%productName%}/g, item.productName)
    card = card.replace(/{%img%}/g, item.image)
    card = card.replace(/{%quantity%}/g, item.quantity)
    card = card.replace(/{%price%}/g, item.price)
    card = card.replace(/{%ID%}/g, item.id)
    card = card.replace(/{%from%}/g, item.from)
    card = card.replace(/{%nutrients%}/g, item.nutrients)
    card = card.replace(/{%description%}/g, item.description)
    if(item.organic){
        card = card.replace(/{%isOrganic%}/g, 'ORGANIC')
    }else{
        card = card.replace(/{%isOrganic%}/g, 'NON-ORGANIC')
    }
    return card;
}

const server = http.createServer((req,res) => {
    const {pathname, query} = url.parse(req.url,true)
    // console.log(pathname)
    // console.log(req.url)
   
    if(pathname === '/' || pathname ==='/overview'){
        //overview page
        res.writeHead(200, {'Content-Type': 'text/html'})
        let cardHtmlArr = dataObj.map(product=> renderCard(tempCard, product)).join('')
        let output = tempOverView.replace(/{%productCard%}/g,cardHtmlArr)
        res.end(output)
    }else if(pathname === '/product'){
        //product page
        res.writeHead(200, {'Content-Type': 'text/html'})
        const product = dataObj.find(item => item.id ==query.id)
        console.log(product)
        const productHtml = renderCard(tempProduct,product)
        res.end(productHtml)
    }else if(pathname === '/api'){
        //API
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(data)
    }else{
        //page not found
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'Hi there'
        })
        res.end('<h1>page not found 404</h1>')
    }
})
server.listen(8000, '127.0.0.1', ()=>{console.log('listening to requests on port 8000')})

//FILES
// const textIn=fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)

// const textOut = `this is ${textIn} `
// console.log(textOut)
// fs.writeFileSync('./txt/output.txt', textOut)

//read file asynchronous
// fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
//     console.log(data)
//     fs.writeFile('./txt/final.txt',`${data}`,'utf-8',(err)=>console.log('your file has been written'))
// })
// console.log('will read file')



