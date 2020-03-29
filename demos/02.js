const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body =Object.assign({},{request:ctx.request},{response:ctx.response});
  console.log(ctx.request)
  console.log(ctx.response)
};

app.use(main);
app.listen(3000);
