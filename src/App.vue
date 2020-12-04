<template>
  <div id="app">
    <router-view style="height:100%" />
  </div>
</template>

<style lang="scss">
#app,body,html{
  padding: 0;
  margin: 0;
  height: 100%;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition:1s;
}


.fade-leave{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
.fade-leave-active{
  transition:1s;
}
::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
background-color:#f8f8f8;
}
::-webkit-scrollbar {//滚动条的宽度
width:9px;
height:9px;
}
::-webkit-scrollbar-thumb {//滚动条的设置
background-color:#dddddd;
background-clip:padding-box;
min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
background-color:#bbb;
}
// 二，给某个div .test1加滚动条样式
.test1::-webkit-scrollbar {
width: 8px;
}
.test1::-webkit-scrollbar-track {
background-color:red;
-webkit-border-radius: 2em;
-moz-border-radius: 2em;
border-radius:2em;
}
.test1::-webkit-scrollbar-thumb {
background-color:green;
-webkit-border-radius: 2em;
-moz-border-radius: 2em;
border-radius:2em;
}
</style>
