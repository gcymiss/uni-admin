<template>
  <div>
    <!-- 头部 -->
    <heads class="abs"></heads>
    <router-view class="pad"> </router-view>
  </div>
</template>

<script>
import heads from "./header";
import navBar from "./navBar";
export default {
  name: "",
  data() {
    return {
      num: null,
    };
  },
  computed: {},

  mounted() {},
  components: {
    navBar,
    heads,
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
button {
  width: 40px;
}
.abs{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.pad{
  padding-top:60px;
  box-sizing:border-box;
}
</style>
