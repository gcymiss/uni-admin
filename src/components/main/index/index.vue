<template>
  <div style="height:100%;display:flex;">
       <el-menu 
      style="height:100%;width: 15%; box-sizing: border-box;"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      active-text-color="teal"
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">相册管理</span>
      </el-menu-item>
      <el-menu-item index="/shop/goods">
        <i class="el-icon-s-claim"></i>
        <span slot="title">商品列表</span>
      </el-menu-item>
    </el-menu>
    <div id="mains" style="width: 85%;height:100%;overflow:auto; background:#F7F8F9 " >
    <navs v-if="$route.path!=='/index'"></navs>
    <router-view style="padding: 20px;"></router-view>
    </div>
  </div>
</template>

<script>
import navs from '../../navBar'
export default {
  name: '',
  data() {
    return {
    };
  },
  computed:{
  },
  methods: {},
  components:{navs}
};
</script>

<style scoped lang='scss'>

</style>
