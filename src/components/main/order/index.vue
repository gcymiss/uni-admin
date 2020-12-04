<template>
  <div style="height:100%">
       <el-menu
      style="height: 100%; width: 15%; float: left; box-sizing: border-box"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      active-text-color="teal"
      router
    >
      <el-menu-item index="/order/order">
        <i class="el-icon-s-home"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/order/invoice">
        <i class="el-icon-picture"></i>
        <span slot="title">发票管理</span>
      </el-menu-item>
      <el-menu-item index="/order/after-sale">
        <i class="el-icon-s-claim"></i>
        <span slot="title">售后服务</span>
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
