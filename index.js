const fs = require("fs");
const http = require("http");
const url = require("url");
const repaceTemplate = require('./modules/replaceTemplate')

const tempOverView =  fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard     =  fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct  =  fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);



const server = http.createServer((req,res) => {
    const {pathname, query} = url.parse(req.url,true)
   
    if(pathname === '/' || pathname ==='/overview'){
        //overview page
        res.writeHead(200, {'Content-Type': 'text/html'})
        let cardHtmlArr = dataObj.map(product=> repaceTemplate(tempCard, product)).join('')
        let output = tempOverView.replace(/{%productCard%}/g,cardHtmlArr)
        res.end(output)
    }else if(pathname === '/product'){
        //product page
        res.writeHead(200, {'Content-Type': 'text/html'})
        const product = dataObj.find(item => item.id ==query.id)
        const productHtml = repaceTemplate(tempProduct,product)
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





