<template>
  <div>
    <div style="padding:10px">
      <el-button type="success" size="mini">添加等级</el-button>
      <div style="float:right">
        <div class="title">
          选择升级标准:
          <el-button-group>
            <el-button type="success" size="mini" @click="money=false" plain>累计消费</el-button>
            <el-button type="success" size="mini" @click="money=true" plain>累计次数</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <!-- 表单数据列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="会员等级" align="center" width="140px"></el-table-column>
      <el-table-column prop="max_price" label="升级条件" align="center" width="240px">
        <template slot-scope="scope">
          <span v-if="!money">累计消费:{{scope.row.max_price}}</span>
          <span v-if="money">累计次数:{{scope.row.max_times}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="discount" align="center" label="折扣率%"></el-table-column>
      <el-table-column prop="level" align="center" label="等级序号"></el-table-column>
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
      <el-table-column prop="address" align="center" label="操作">
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
      style="bottom: 0;left: 168px;right: 0;z-index: 100;"
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
import api from "@/api/user-level";

export default {
  name: "",
  data() {
    return {
      money: false,
      tableData: [],
      list: [],
      lists: [],
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

      // this.tableData = this.tableData.map((item) => {
      //   return item.user_level;
      // });

      console.log(this.tableData);

      //获取多少条
      this.page.total = res.data.totalCount;
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
  },
  mounted() {
    this.getlist();
  },
};
</script>

<style scoped lang='scss'>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
