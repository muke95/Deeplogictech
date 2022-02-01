const cheerio = require('cheerio');
const request = require('request');
const express = require("express");
const { links } = require('express/lib/response');
const app = express();
app.use(express.json());

app.get('/getTimeStories', async (req,res)=>{
    
    const data = await request({
    method: 'GET',
    url: 'https://time.com'
},  (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let linkObjects =  $('a');
    
    const total = linkObjects.length;

    const links = [];
    


    for(let i = 0; i < total; i++){
        links.push({
            href: linkObjects[i].attribs.href,
            title: linkObjects[i].attribs.title
        });
    }
   
   console.log(links);

 


    
});

})



app.listen(3000,(req,res)=>{
    console.log("server is running 3000");
})