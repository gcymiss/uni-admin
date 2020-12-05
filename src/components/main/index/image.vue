<template>
  <div style="position: absolute; inset: 120px 0px 121px 194px">
    <!-- 头部输入框 -->
    <div style="min-width: 587px" id="mains">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        size="mini"
        class="muform"
      >
        <div>
          <el-select
            v-model="form.sort"
            placeholder=""
            size="mini"
            style="width: 150px; margin-right: 10px"
          >
            <el-option label="降序" value="0"></el-option>
            <el-option label="升序" value="1"></el-option>
          </el-select>
          <el-input
            v-model="form.keyword"
            placeholder="请输入内容"
            style="width: 150px; margin-right: 10px"
            width="150"
            size="mini"
          ></el-input>
          <el-button type="success" size="mini" @click="search">搜索</el-button>
        </div>

        <div>
          <el-button type="success" size="mini" @click="addImageFl"
            >创建相册</el-button
          >
          <el-button type="warning" size="mini" @click="addimgs"
            >上传图片</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 内容部分 -->
    <div class="cent" style="height: 100%">
      <!-- 左侧列表 -->
      <div class="leftType">
        <ul class="list-group">
          <li
            @click="getImgSrc(item.id)"
            class="list-group-item list-group-item-action activebg"
            v-for="(item, index) in imgListData"
            :key="index"
            style="
              border-bottom: 1px solid #dee2e6;
              border-top: 0;
              border-left: 0;
              border-right: 0;
              cursor: pointer;
            "
          >
            <span>{{ item.name }}</span>
            <el-dropdown class="activeleft">
              <span>
                {{ item.images_count
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editFl(item)"
                  >修改</el-dropdown-item
                >

                <el-dropdown-item @click.native="deleteFl(item.id)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <!-- 右侧内容 -->
      <div class="rightbox" style="width: 100%">
        <div
          style="padding: 10px; float: left"
          v-for="(item, index) in imgSrc"
          :key="index + item"
        >
          <div class="card" style="width: 15rem">
            <img :src="item.url" class="card-img-top" style="height: 10rem" />
            <p class="imgsrcp">{{ item.path }}</p>
            <div class="card-body" style="padding: 0.8rem">
              <el-button-group>
                <el-button
                  size="mini"
                  icon="el-icon-view"
                  @click="viewSrc(item)"
                ></el-button>
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="editSrc(item)"
                ></el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteSrc(item)"
                ></el-button>
              </el-button-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧底部分页 -->
    <div class="pages">
      <div class="currents">
        <el-button-group>
          <el-button size="mini" icon="el-icon-arrow-left">上一页</el-button>
          <el-button size="mini"
            >下一页<i class="el-icon-arrow-right el-icon--right"></i
          ></el-button>
        </el-button-group>
      </div>
      <div class="block" style="flex: 1">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.limit"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 修改新增对话框 -->
    <el-dialog title="修改相册" :visible.sync="editFls">
      <el-form :model="imag">
        <el-form-item label="相册名称" :label-width="formLabelWidth">
          <el-input v-model="imag.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相册排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="imag.order"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFls = false">取 消</el-button>
        <el-button type="primary" @click="okeditFl">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog title="创建相册" :visible.sync="addFls">
      <el-form :model="imas">
        <el-form-item label="相册名称" :label-width="formLabelWidth">
          <el-input v-model="imas.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相册排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="imas.order"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFls = false">取 消</el-button>
        <el-button type="primary" @click="addFlOK">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="addimg">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addimg = false">取 消</el-button>
        <el-button type="primary" @click="addimgOK">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改图片名称 -->
    <el-dialog
      title="提示"
      :visible.sync="eidtSrcs"
      :before-close="editSrcClose"
    >
      <el-form :model="form" label-position="top">
        <el-form-item label="请输入新名称" :label-width="formLabelWidth">
          <el-input v-model="src.path" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="eidtSrcs = false">取 消</el-button>
        <el-button type="primary" @click="editSrcOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/bootstrap.css";
import image from "@/api/image";
export default {
  name: "",
  data() {
    return {
      flIds : null,
      src: { path: "" },
      eidtSrcs: false,
      addimg: false,
      addFls: false,
      title: "",
      imgSrc: [],
      imag: {
        name: "",
        order: "",
      },
      imas: {
        name: "",
        order: "",
      },
      formLabelWidth: "120px",
      editFls: false,
      form: {
        sort: "0",
        keyword: "",
      },
      page: {
        size: 1,
        limit: 10,
        total: null,
      },
      imgListData: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getImageList();
  },
  methods: {
    editSrcClose() {
      this.eidtSrcs = false;
      this.src.path = {};
    },
    // 查看图片
    viewSrc(item) {},
    // 编辑图片
    editSrc(item) {
      this.src = item;
      this.eidtSrcs = true;
    },
    // 确定编辑图片
    editSrcOk() {
      image.editImg(this.src.id, this.src.path).then((res) => {
        if (res.msg == "ok") {
          this.editSrcClose();
          this.eidtSrcs = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        }
      });
    },
    // 删除图片
    deleteSrc(item) {
      this.$confirm("是否删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          image.deleteImg(item.id).then((res) => {
            if (res.msg == "ok") {
              image.reloadImg().then((res) => {
                console.log(res);
              });
              this.getImgSrc(this.flIds)
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取图片列表
    async getImgSrc(id) {
      this.flIds = id;
      let datas = await image.getImg(id, this.page.size, this.page.limit);
      this.imgSrc = datas.data.list;
      this.page.total = datas.data.totalCount;
    },
    // 确认添加图片
    addimgOK() {},
    // 上传图片
    addimgs() {
      this.addimg = true;
    },
    // 确认创建
    async addFlOK() {
      let datas = await image.addImage(this.imas);
      if (datas.msg == "ok") {
        this.$message.success("创建成功");
        this.addFls = false;
        this.imas = {};
      } else {
        this.$message.error("创建失败");
      }
    },
    // 创建相册
    addImageFl() {
      this.addFls = true;
    },
    // 搜索
    async search() {
      let datas = await image.imageSearch(
        this.page.size,
        this.page.limit,
        this.form.keyword
      );
      this.getImageList();
    },
    // 确认修改
    async okeditFl() {
      let datas = await image.imageEdit(this.imag.id, this.imag);
      if (datas.msg === "ok") {
        this.$message.success("修改完成");
        this.getImageList();
        this.editFls = false;
      }
    },
    // 修改图片分类
    editFl(val) {
      this.imag = val;
      this.editFls = true;
    },
    // 删除图片分类
    deleteFl(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let datas = await image.imageDelete(id);
          this.getImageList();
          if (datas.msg === "ok") {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //  条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getImageList();
    },
    // 页数
    handleCurrentChange(val) {
      this.page.limit = val;
      this.getImageList();
    },
    // 获取数据
    async getImageList() {
      let datas = await image.imageList(this.page.size, this.page.limit);
      this.page.total = datas.data.totalCount;
      this.imgListData = datas.data.list;
    },
  },
};
</script>

<style scoped lang='scss'>
.el-form-item {
  margin: 0;
}
.card-body {
  display: flex;
  justify-content: center;
}
.card {
  position: relative;
}
.imgsrcp {
  position: absolute;
  bottom: 53px;
  margin: 0;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.currents {
  min-width: 200px;
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
  box-sizing: border-box;
  border-right: 0.5px solid #cecece;
}
.pages {
  width: 100%;
  border-top: 1px solid #cecece;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cent {
  height: 100%;
  width: 100%;
  display: flex;
}
.rightbox {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  // display: flex;
  flex-wrap: wrap;
}
.activebg:hover {
  background: #f8f9fa;
}
.activeleft {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  border: 1px solid #dee2e6 !important;
  background-color: #f8f9fa;
}
// 点击添加样式
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
.activebg {
  color: black;
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: 0.4px solid rgb(223, 223, 223);
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  span {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.leftType {
  height: 100%;
  min-width: 210px;
  overflow: auto;

  ul {
    border-right: 0.5px solid rgb(223, 223, 223);
    width: 200px;
    height: 100%;
    background: white;
  }
}
.muform {
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(226, 226, 226);
  align-items: center;
}
</style>
