<template>
  <div class="AddCoupon">
    <!-- 添加 -->
    <el-row :gutter="20" class="AddCoupon-Info">
      <el-col :span="3">
        <el-button
          type="primary"
          class="AddCoupon-Info-li"
          size="small"
          @click="AddCouponShow = true"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <!-- 查询列表 -->
    <el-row class="AddCoupon-list">
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%" >
          <el-table-column type="selection" label="序" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="epidemicname" label="疫情名称" width="150px" align="center">
          </el-table-column>
          <el-table-column prop="createtime" label="添加时间" width="240px" align="center">
          </el-table-column>
          <el-table-column prop="updatetime" label="更新时间" width="240px" align="center">
          </el-table-column>
          <el-table-column label="更新" width="120px" align="center" >
            <template slot-scope="scope" width="80px">
              <el-button type="text" @click="updatekeycodeinfo(scope.row)"
                >修改</el-button
              >
              <el-button type="text" @click="deleteepidemicinfo(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="添加类型" :visible.sync="AddCouponShow">
      <el-form
        :model="AddCouponForm"
        :rules="AddCouponRules"
        ref="AddCouponForm"
      >
        <el-form-item
          label="疫情名称"
          :label-width="AddCouponWidth"
          prop="name"
        >
          <el-input
            v-model="AddCouponForm.name"
            autocomplete="off"
            placeholder="请输入疫情名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddCouponSubmit(AddCouponForm)" type="primary"
          >添 加</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="修改数据" :visible.sync="genggaishow">
      <el-form :model="temp" ref="temp">
        <el-form-item label="疫情名称" :label-width="keyCodeWidth">
          <el-input v-model="temp.epidemicname" />
        </el-form-item>
        <el-form-item label="修改时间" :label-width="keyCodeWidth">
          <el-input v-model="temp.updatetime" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSubmit(temp)" type="primary"
          >修改提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../../../node_modules/axios";
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      // 弹出层
      AddCouponShow: false,
      AddCouponForm: {
        name: "",
        start: "",
        end: "",
      },
      keyCodeWidth: "120px",
      genggaishow: false,
      temp: {
        id: "",
      },
      AddCouponRules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        condition: [
          { required: true, message: "请输入使用描述", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 2 到 25 个字符",
            trigger: "blur",
          },
        ],
        notice: [
          { required: true, message: "请输入详细信息", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
      AddCouponWidth: "120px",
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8991/get_epidemic_type")
      .then(
        (response) => (
          console.log(response.data.result),
          (this.tableData = response.data.result)
        )
      );
  },
  methods: {
    updatekeycodeinfo(val) {
      this.genggaishow = true;
      this.temp = Object.assign({}, val);

      // this.temp.updatetime = new Date(this.temp.updatetime);
    },
    updateSubmit(val) {
      if (val.epidemicname.length > 0) {
        console.log(val.epidemicname);
        let formdata = new FormData();
        formdata.append("id", val.id);
        formdata.append("epidemicname", val.epidemicname);
        axios
          .post("http://127.0.0.1:8991/update_epidemic_type", formdata)
          .then((response) => alert(response.data.res),this.reload());    
      } else {
        alert(response.data.res);
        this.reload();
      }
    },
    deleteepidemicinfo(val) {
      console.log(val.epidemicname);
      let formdata = new FormData();
      formdata.append("id", val.id);
      if (val.epidemicname.length > 0) {
        console.log(val.epidemicname);
        axios
          .post("http://127.0.0.1:8991/del_epidemic_type", formdata)
          .then((response) => alert(response.data.res),this.reload());    
      } else {
        alert(response.data.res);
        this.reload();
      }
    },
    AddCouponSubmit(formName) {
      console.log(formName.name);
      if (formName.name.length > 0) {
        console.log(formName.name);
        let formdata = new FormData();
        formdata.append("name", formName.name);
        axios
          .post("http://127.0.0.1:8991/ins_epidemic_type", formdata)
          .then((response) => alert(response.data.res),this.reload());    
      } else {
        alert(response.data.res);
        this.reload();
      }
    },
  },
};
</script>

<style scoped>
.AddCoupon {
  width: 100%;
  min-height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.AddCoupon-Info {
  width: 100%;
  margin-bottom: 15px;
}
.AddCoupon-Info-li {
  width: 100%;
}
.AddCoupon-list {
  width: 100%;
  margin-bottom: 20px;
}
.AddCoupon-page-box {
  display: flex;
  justify-content: flex-end;
}
</style>