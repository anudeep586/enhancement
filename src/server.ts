import * as Koa from 'koa';
import * as Router from 'koa-router'
import logger=require('koa-logger');
import bodyparser=require('koa-bodyparser')
import { addProfileDetails, changeProfileAsAdmin, getAllProfileDetails, getMyProfileDetails, loginController, loginThroughGoogle, registerController, updateProfile } from './controllers';
import { verifyToken } from './middleware/middleware';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;

const app=new Koa();
const router=new Router();
app.use(logger());
app.use(bodyparser());

router.get('/',async (ctx)=>{
    ctx.body='Welcome to Koa';
});

router.post('/v1/register',registerController);

router.post('/v1/login',loginController);

router.post('/v1/add-profile-details',verifyToken,addProfileDetails)

router.post('/v1/loginThroughGoogle', loginThroughGoogle);

router.get('/v1/get-my-profile-details',verifyToken,getMyProfileDetails)

router.get('/v1/get-all-user-profile-details',verifyToken,getAllProfileDetails)

router.patch('/v1/update-profile',verifyToken,updateProfile)

router.patch('/v1/change-role',verifyToken,changeProfileAsAdmin)


app.use(router.routes());
app.listen(port);

console.log(` My koa server is up and listening on port ${port}`)