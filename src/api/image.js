import request from '@/utils/request'
export default {
    // 相册分类列表
    imageList(page, limit) {
        return request({
            url: `imageclass/${page}?limit=${limit}`,
            method: "get",
        })
    },
    // 删除相册分类
    imageDelete(id) {
        return request({
            url: `imageclass/${id}`,
            method: "DELETE",
        })
    },
    // 修改相册分类
    imageEdit(id, datas) {
        return request({
            url: `imageclass/${id}`,
            method: "POST",
            data: {
                ...datas
            }
        })
    },
    // 搜索
    imageSearch(page, limit, keyword) {
        return request({
            url: `imageclass/107/image/${page}?limit=${limit}&order=desc&keyword=${keyword}`,
            method: "get",
        })
    },
    // 创建相册
    addImage(data) {
        return request({
            url: "imageclass",
            method: "post",
            data: {
                ...data
            }
        })
    },
    // 获取图片
    getImg(id, page, limit) {
        return request({
            url: `imageclass/${id}/image/${page}?limit=${limit}&order=desc`,
            method: "get",
            data: {

            }
        })
    },
    // 删除图片
    deleteImg(id) {
        return request({
            url: `image/${id}`,
            method: "DELETE",
            data: {

            }
        })
    },
    //   修改图片
    editImg(id, data) {
        return request({
            url: `image/${id}`,
            method: "POST",
            data: {
                name: data
            }
        })
    },
    //   刷新接口
    reloadImg() {
        return request({
            url: `/imageclass/1`,
            method: "GET",
        })
    },
}