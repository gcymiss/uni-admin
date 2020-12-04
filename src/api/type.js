import request from "@/utils/request"
 export default{
     //获取分页接口
     typePages(page,limit) {
        return request({
            url: `/goods_type/${page}?limit=${limit}`,
            method: 'get',

        })
    },
    //获取添加接口
    pageAdd(datas) {
        return request({
            url: "/goods_type",
            method: 'post',
            data: {
               ...datas
            }
        })
    },
     //获取修改接口
    updataSize(id,data){
        return request({
            url:`/goods_type/${id}`,
            method:'post',
            data:{
               ...data
            }
        })
    },
     //删除接口
 deleteList(id){
    return request({
        url:`/goods_type/${id}/delete`,
        method:'post',
    })
},
//批量删除接口
 deleteall(ids){
   return request({
       url:`/goods_type/delete_all`,
       method:'post',
       data:{
            ids
       }
   })
 },
 //状态接口
 editStatus(id,status){
     return request({
         url:`/goods_type/${id}/update_status`,
         method:"post",
         data:{
             status
         }
     })
 }
 }


