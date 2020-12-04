import request from "@/utils/request"
 export default{
     //获取分页接口
     pages(page,limit) {
        return request({
            url: `/skus/${page}?limit=${limit}`,
            method: 'get',

        })
    },
    //获取添加接口
    pageadd(datas) {
        return request({
            url: "/skus",
            method: 'post',
            data: {
               ...datas
            }
        })
    },
     //获取修改接口
    updataSize(id,data){
        return request({
            url:`/skus/${id}`,
            method:'post',
            data:{
               ...data
            }
        })
    },
     //删除接口
 deleteList(id){
    return request({
        url:`/skus/${id}/delete`,
        method:'post',
    })
},
//批量删除接口
 deleteall(ids){
   return request({
       url:`/skus/delete_all`,
       method:'post',
       data:{
            ids
       }
   })
 },
 //状态接口
 editStatus(id,status){
     return request({
         url:`/skus/${id}/update_status`,
         method:"post",
         data:{
             status
         }
     })
 }
 }


