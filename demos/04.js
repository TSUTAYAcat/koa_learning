const fs = require('fs');
const Koa = require('koa');

const app = new Koa();

const main = (ctx=>{
    if(ctx.request.path==='/'){
        ctx.response.type='html'
        ctx.response.body =`<a href = '/future'>随我一起走</a>`
    }else if(ctx.request.path==='/future'){
        ctx.response.type='html'
        ctx.response.body = fs.createReadStream('future.html')
    }else{
        ctx.response.body='BACK'
    }
    
})

app.use(main);
app.listen(3000)