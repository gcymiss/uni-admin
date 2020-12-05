<template>
  <div>
    <div style="padding:10px">
      <el-button type="success" size="mini">添加会员</el-button>
      <div style="float:right">
        <el-input placeholder="手机号/邮箱/会员名称" style="width:200px;" size="mini"></el-input>
        <el-button type="info" size="mini" style="margin-left:5px;">搜索</el-button>
        <el-button size="mini">高级搜索</el-button>
      </div>
    </div>
    <!-- 表单部分 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="会员" width="280" align="center">
        <template slot-scope="scope">
          <div class="row">
            <div class="nei">
              <img :src="scope.row.avatar" alt />
              <div class="p1">
                <p class="PP">
                  {{scope.row.nickname}}
                  <span class="s1">详情</span>
                </p>
                <p class="ppp">用户id:{{scope.row.id}}</p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="user_level.name" label="会员等级" align="center"></el-table-column>
      <el-table-column label="登录注册" width="240px" align="center">
        <template slot-scope="scope">
          <p>注册时间:{{scope.row.create_time}}</p>
          <p>最后登录:</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <el-row slot-scope="scope">
          <el-button
            v-if="scope.row.status === 0"
            @click="noPlay(scope.row)"
            type="danger"
            size="mini"
            plain
          >禁用</el-button>
          <el-button
            v-if="scope.row.status === 1"
            @click="yesPlay(scope.row)"
            type="success"
            size="mini"
            plain
          >启用</el-button>
        </el-row>
      </el-table-column>
      <el-table-column prop="data.list.name" label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <span style="color: #008080;  cursor:pointer">修改</span>
            <span  style="color: #008080; margin-left:20px; cursor:pointer"  @click="deleteListe(scope.row.id)">删除</span>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="height: 60px;"></div>
    <el-footer
      class="border-top d-flex align-items-center px-0 position-fixed bg-white"
      style="bottom: 0;left: 200px;right: 0;z-index: 100;"
    >
      <div style="flex: 1;" class="px-2">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.limit"
          :page-sizes="[10, 20, 50]"
          :page-size="page.size"
          :total="page.total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-footer>
  </div>
</template>

<script>
import "@/assets/bootstrap.css";
import api from "@/api/user-list";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        size: 0,
        limit: 10,
        total: null,
      },
    };
  },
  computed: {},

  methods: {
    //获取数据列表
    async getlist() {
      //获取接口传来的数据
      let res = await api.typePages(this.page.page, this.page.limit);
      //获取数据 list下的数据
      this.tableData = res.data.list;
      console.log(this.tableData);
      //获取多少条
      this.page.total = res.data.totalCount;
    },
        //分页  条数
    handleSizeChange(val) {
      this.page.page = val;
      this.getlist();
    },
    // 页数
    handleCurrentChange(val) {
      this.page.limit = val;
      this.getlist();
    },
     //删除
    deleteListe(id) {
      console.log(id);
      this.$confirm("确认删除这条信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .deleteList(id)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: "演示数据，禁止删除",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
        // 状态修改
    async noPlay(val) {
      let response = await api.editStatus(val.id, 1);
      this.$message.success("禁用成功");
      this.getlist();
    },
    async yesPlay(val) {
      let response = await api.editStatus(val.id, 0);
      this.$message.success("启用成功");
      this.getlist();
    },
  },
  mounted() {
    this.getlist();
  },
};
</script>

<style scoped lang='scss'>
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  float: left;
}
.row {
  display: flex;
  width: 240px;
  height: 60px;
}
.p1 {
  float: left;
  width: 180px;
}
.PP {
  font-size: 16px;
  color: #858689;
  position: relative;
  height: 20px;
}
.s1 {
  font-size: 16px;
  color: #008080;
  position: absolute;
  left: 150px;
  width: 80px;
}
</style>
