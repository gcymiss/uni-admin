<template>
  <div>
    <!-- 左边 -->
    <template>
      <div style="padding: 10px">
        <el-button size="mini" type="success" @click="addedit()">添加类型</el-button>
        <el-button size="mini" type="danger" @click="delall(tableChecked)">批量删除</el-button>
      </div>
    </template>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="45"></el-table-column>
      <el-table-column label="类型名称" prop="name"></el-table-column>
      <el-table-column prop="goods_type_values.name" align="center" label="属性标签" width="380">
        <!-- <template slot-scope="scope">
				{{scope.row.value_list|formatValue}}
        </template> -->
       
      </el-table-column>
      <el-table-column align="center" prop="order" label="排序"></el-table-column>
      <el-table-column prop="status" align="center" label="状态" width="120">
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
      <el-table-column prop="data.list.name" label="操作"  align="center" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              style="border-left: 1px solid #B3D8FF;border-radius: 3px 0 0 3px;"
              @click="openModel(scope.row)"
              plain
            >修改</el-button>
            <el-button type="danger" size="mini" @click="deleteListe(scope.row.id)" plain>删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 添加类型 -->
    

  </div>
</template>

<script>
import "@/assets/bootstrap.css";
import api from "@/api/type";
export default {
  name: "",
  data() {
    return {
      multipleSelection: [],
      ids: [], //批量删除的id
      tableData: [],
      page: {
        page: 1,
        size: 0,
        limit: 10,
        total: null,
      },
      title: "",
      visibledit: false,
      visibleadd: false,
      form: {
        name: "",
        order: null,
        status: null,
        default: "",
        type: "",
      },
      edit:{

      },
      tableChecked: [],
      rules: {
        name: [
          {
            required: true,
            message: "规格名称不能为空",
            trigger: "blur",
          },
        ],
        default: [
          {
            required: true,
            message: "规格值不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: true,
    };
  },

  computed: {},
  methods: {
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
    // 点击确定添加
   async handladd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
        let response = await api.pageadd(this.form);
          if (response.msg === "ok") {
            this.handleClose();
            this.$message.success("添加完成");
            this.getlist();
          } else {
            this.$message.error("添加失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 确定修改
       async handledit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let response = await api.updataSize(this.edit.id, this.edit);
          if (response.msg === "ok") {
            this.handleClose();
            this.$message.success("修改完成");
            this.getlist();
          } else {
            this.$message.error("修改失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  关闭弹框方法
    handleClose() {
      this.visibledit = false;
      this.visibleadd = false;
      this.form = {};
      this.edit = {};
    },
    //获取数据列表
    async getlist() {
      //获取接口传来的数据
      let res = await api. typePages(this.page.page, this.page.limit);
      //获取数据 list下的数据
      this.tableData = res.data.list;
      console.log(this.tableData)
        var arr = []
 
      let datas = this.tableData.map(item=>{
        item.goods_type_values.map(value=>{
          arr.push({
            name:value.name,
          })
        })
      })
          console.log(arr)
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
    //修改
    openModel(val) {
      this.edit = val;
      this.visibledit = true;
    },
    //添加
    addedit() {
      this.visibleadd = true;
    },
    // 选中信息
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(val.length=="0"){
        this.tableChecked = []
      }else{
          val.map((item) => {
        this.tableChecked.push(item.id);
      });
      }
    },
//删除
    delall() {
      if (this.tableChecked.length == 0) {
        this.$message.error("请先选中需要删除的信息");
      } else {
        this.$confirm("是否要删除选中的规格?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getlist();
            this.$message.error("演示数据，禁止删除");
            this.tableChecked = [];
         
          })
          .catch(() => {
              this.tableChecked = [];
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
  mounted() {
    this.getlist();
  },
};
</script>

<style scoped lang='scss'>
</style>
