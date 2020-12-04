<template>
  <div style="height:100%">
      <el-menu
      style="height: 100%; width: 15%; float: left; box-sizing: border-box"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      active-text-color="teal"
      router
    >
      <el-menu-item index="/set/base">
        <i class="el-icon-s-home"></i>
        <span slot="title">基础设置</span>
      </el-menu-item>
      <el-menu-item index="/set/express">
        <i class="el-icon-picture"></i>
        <span slot="title">物流设置</span>
      </el-menu-item>
      <el-menu-item index="/set/manager">
        <i class="el-icon-s-claim"></i>
        <span slot="title">管理员设置</span>
      </el-menu-item>
      <el-menu-item index="/set/payment">
        <i class="el-icon-s-claim"></i>
        <span slot="title">交易设置</span>
      </el-menu-item>
       <el-menu-item>
        <i class="el-icon-s-claim"></i>
        <span slot="title">测试设置</span>
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
