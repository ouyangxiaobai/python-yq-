<template>
  <div class="index">
    <el-card class="box-card" style="margin-top: 20px">
      <el-button-group class="buttonGroup">
        <p class="p" style="float: left; line-height: 40px">时事新闻</p>
      </el-button-group>
      <el-table
        v-loading="loading"
        ref="filterTable"
        :data="tableData"
        max-height="440"
      >
        <el-table-column
          prop="eventdescription"
          label="新闻标题"
          min-width="400"
        >
          <template slot-scope="scope">
            <a :href="scope.row.eventUrl">{{ scope.row.eventdescription }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="sitename"
          label="发布者/机构"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="eventtime"
          label="发布时间"
          min-width="160"
        ></el-table-column>
        <el-table-column prop="operate" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button type="danger" @click="liteDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <div slot="empty" class="noData">
          <i></i>
          <p>暂无数据</p>
        </div>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "../../../node_modules/axios";
export default {
  data() {
    return {
      tableData: [], // 表格数据
      selectList: [], // 表格选中数据列表
      formData: {}, // 表单数据
      loading: false,
    };
  },
  mounted() {
    this.queryTable(1);
  },
  methods: {
    // 查询表格
    queryTable(index) {
      const that = this;
      index ? (this.currpage = 1) : "";
      let data = {
        page: this.currpage,
        page_size: this.pagesize,
        ...this.formData,
      };
      this.loading = true;
      axios
        .get("http://127.0.0.1:8991/get_news_data")
        .then(
          (res) => ((that.loading = false), (that.tableData = res.data.result))
        );
    },

    // 删除
    liteDel(row) {
      let msg = "";
      const $this = this;
      msg = "确定要删除选中的数据吗？";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          $this.delEvent(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delEvent(row) {
      let formdata = new FormData();
      formdata.append("id", row.id);
      axios.post("http://127.0.0.1:8991/del_news", formdata).then((res) => {
        this.$message({
          message: res.data.res,
          type: "warning",
        });
        this.queryTable();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonGroup {
  // position: absolute;
  // top: 0;
  // left: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  font-weight: bold;
  button {
    margin-left: 10px !important;
    border-radius: 4px !important;
    float: right;
  }
}
.p {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  &::before {
    content: "";
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 24px;
    background-color: rgb(182, 182, 182);
  }
}
.forSearch {
  .p {
    margin-bottom: 12px;
  }
  .tip {
    width: 100%;
    padding: 16px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    p {
      font-weight: bold;
      line-height: 22px;
      margin-bottom: 8px;
    }
    span {
      color: gray;
      i {
        display: inline-block;
        margin-right: 4px;
      }
    }
  }
}
</style>
