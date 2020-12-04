//引入router路由对象
import router from "./router"

//引入vuex的实例对象
import store from "./store"

//使用路由守卫对路由进行拦截
router.beforeEach( (to,from,next) => {
    //获取vuex里面存储的token
    const token = sessionStorage.getItem('user_token')
    if(!token){
        if(to.path == "/login"){
            next();
        }else{
            next("/login");
        }
    }else{
        if(to.path !== "/login" ){
            next();
        }else{
            next(from.path);
        }
    }
})