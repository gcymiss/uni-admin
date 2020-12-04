<template>
  <div class="navs">
     <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item  :to="{ path: '/index' }">后台首页</el-breadcrumb-item>
     <el-breadcrumb-item >{{$route.meta.title}}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
  computed:{
  },
  methods: {},
  mounted(){
  }
};
</script>

<style scoped lang='scss'>
.navs{
  width:100%;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid rgb(228, 228, 228);
  padding-left: 30px;
  box-sizing: border-box;
}
</style>
