const Koa = require('koa');
const app = new Koa();
const router = require('./src/router');
const fs = require('fs')
const bodyParser = require('koa-bodyparser')


app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
//静态资源处理
app.use(require('koa-static')(__dirname + '/public/build'));
console.log(__dirname);

app.use(router.routes())

// 处理刷新页面404， 当刷新页面浏览器地址栏可能是http://localhost:3000/admin/role，其实这是
// 前端路由，这是在后端路有没有规定的所以找不到，所以我们自定义中间件，当找不到执行下面代码，请求index.html
app.use(async ctx => {
  console.log(ctx.originalUrl)
  if(ctx.originalUrl === '/src/static/html/lee.jpg'){
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream(__dirname + '/src/static/html/lee.jpg')
  }else{
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream(__dirname + '/public/build/index.html')
  }
 
})
app.listen(3000)

