const fs = require('fs');
const Router = require('koa-router');
const url = require('url');

const UpdateUser = require('./toMysql/user'); // 操作user数据库
const UpdateCategory = require('./toMysql/category'); // 操作user数据库

// 根部路由
const router = new Router();
// user相关路由
const userRouter = new Router();
// 分类相关路由
const categoryRouter = new Router();
// 首页：/
const index = async ctx => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream(__dirname +'/static/html/future.html')

}
// 用户登录接口：/user/login
const login = async ctx => {
    const { pathname, query } = url.parse(ctx.request.url, true);
    console.log(pathname, query)
    let result = null
    try {
        result = await UpdateUser.login(query)
    } catch (error) {
        console.log(error)
        throw (error)
    } finally {
        if (result && result.length > 0) {
            console.log(result)
            ctx.response.body = {
                success: true,
                username: result[0].username,
                password: result[0].password
            }
        } else {
            ctx.response.body = {
                success: false
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
            result = await UpdateUser.joinUs(postData)
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
// 分类列表接口
const getCategoryList = async ctx => {
    console.log(1)
    const { pathname, query } = url.parse(ctx.request.url, true)
    console.log(query, pathname)
    let result = null
    try {
        result = await UpdateCategory.getCategoryList(query)
    } catch (error) {
        console.log(error)
        throw (error)
    } finally {
        if (result && result.length > 0) {
            console.log(result)
            ctx.response.body = {
                success: true,
                data: result

            }
        } else {
            ctx.response.body = {
                success: false

            }
        }
    }
}
// user下路由管理
userRouter.get('/login', login);
userRouter.use('/register', register.routes());
// 分类下路由管理
categoryRouter.get('/list', getCategoryList);
// 根路由管理,并导出
router.use('/api/category', categoryRouter.routes());
router.use('/user', userRouter.routes());
router.get('/loveu', index);
module.exports = router