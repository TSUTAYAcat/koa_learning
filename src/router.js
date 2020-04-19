const fs = require('fs');
const Router = require('koa-router');
const mysql = require('./toMysql/user'); // 操作user数据库
const url = require('url');

// 根部路由
const router = new Router();
// user相关路由
const userRouter = new Router();

// 首页：/
const index = async ctx => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./static/html/future.html')
}
// 用户登录接口：/user/login
const login = async ctx => {
    const { pathname, query } = url.parse(ctx.request.url, true);
    console.log(pathname, query)
    let result = null
    try {
        result = await mysql.login(query)
    } catch (error) {
        console.log(error)
        throw (error)
    } finally {
        if (result && result.length > 0) {
            ctx.response.body = {
                data: {
                    loginSuccess: true
                }
            }
        } else {
            ctx.response.body = {
                data: {
                    loginSuccess: false
                }
            }
        }

    }
}

// 用户注册接口：/user/register/register
const register = new Router();//创建个人用户路由对象
register.post('/joinUs', async ctx => {
    const postData = ctx.request.body;
    if (postData.username && postData.password) {
        try {
            result = await mysql.joinUs(postData)
        } catch (error) {
            console.log(error)
            throw (error)
        } finally {
            if (!result || result.failed) {
                ctx.response.body = {
                    success: false,
                    message: '请输入用户名或密码',
                }
            } else {
                ctx.response.body = {
                    success: true,
                    message: '注册成功',
                }
            }
        }
    } else {
        ctx.response.body = {
            success: false,
            message: '请输入用户名或密码',
        }
    }
})

// user下路由管理
userRouter.get('/login', login);
userRouter.use('/register', register.routes());

// 根路由管理,并导出
router.use('/user', userRouter.routes());
router.get('/', index);
module.exports = router