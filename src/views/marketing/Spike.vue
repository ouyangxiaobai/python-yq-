<template>
  <div class="Spike">
    <!-- 添加 -->

    <el-row :gutter="20" class="Spike-Info">
      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
        <el-button
          type="primary"
          class="Spike-Info-li"
          size="small"
          @click="SpikeShow = true"
          >添加</el-button
        >
      </el-col>
      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
        <el-input
          v-model="serarchword"
          autocomplete="off"
          placeholder="请搜索词"
        ></el-input>
      </el-col>
      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
        <el-button
          type="primary"
          class="Spike-Info-li"
          size="small"
          @click="searchword"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <!-- 查询列表 -->
    <el-row class="Spike-list">
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" label="序" width="80px">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="150px">
          </el-table-column>
          <el-table-column prop="realname" label="真实姓名" width="150px">
          </el-table-column>
          <el-table-column prop="tel" label="用户电话" width="200px">
          </el-table-column>
          <el-table-column prop="createtime" label="添加时间" width="200px">
          </el-table-column>
          <el-table-column label="修改" width="150px">
            <template slot-scope="scope">
              <el-button type="text" @click="updatekeycodeinfo(scope.row)"
                >修改</el-button
              >
              <el-button type="text" @click="deleteuserone(scope.row)"
                >删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="添加用户" :visible.sync="SpikeShow">
      <el-form :model="SpikeForm" :rules="SpikeRules" ref="SpikeForm">
        <el-form-item label="用户名" :label-width="SpikeWidth" prop="name">
          <el-input
            v-model="SpikeForm.name"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="SpikeWidth" prop="start">
          <el-input
            v-model="SpikeForm.realname"
            autocomplete="off"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="SpikeWidth" prop="end">
          <el-input
            v-model="SpikeForm.userpass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户电话" :label-width="keyCodeWidth">
          <el-input v-model="SpikeForm.tel" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SpikeSubmit(SpikeForm)" type="primary"
          >添 加</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="修改数据" :visible.sync="genggaishow">
      <el-form :model="temp" ref="temp">
        <el-form-item label="用户id" :label-width="keyCodeWidth">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="keyCodeWidth">
          <el-input v-model="temp.realname" />
        </el-form-item>
        <el-form-item label="用户电话" :label-width="keyCodeWidth">
          <el-input v-model="temp.tel" />
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
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      // 弹出层
      SpikeShow: false,
      SpikeForm: {
        userid: "",
        realname: "",
        userpass: "",
        tel: "",
      },
      genggaishow: false,
      temp: {
        wordname: undefined,
        createauthor: 1,
        shangxian: "",
        createtime: new Date(),
        remark: "",
        updatetime: new Date(),
        operator: "",
      },
      keyCodeWidth: "120px",
      serarchword: "",
      SpikeRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
      },
      SpikeWidth: "120px",
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8991/get_user_all")
      .then((response) => (this.tableData = response.data.result));
  },
  methods: {
    updatekeycodeinfo(val) {
      this.genggaishow = true;
      this.temp = Object.assign({}, val);

      // this.temp.updatetime = new Date(this.temp.updatetime);
    },
    searchword(val) {
      console.log(getToken());

      let formdata = new FormData();
      formdata.append("username", this.serarchword);
      axios
        .post("http://127.0.0.1:8991/get_user_one", formdata)
        .then(
          (response) => (
            console.log(response.data), (this.tableData = response.data.result)
          )
        );
    },

    updateSubmit(val) {
      if (val.username.length > 0) {
        let formdata = new FormData();
        formdata.append("username", val.username);
        formdata.append("realname", val.realname);
        formdata.append("tel", val.tel);

        console.log(formdata);
        axios
          .post("http://127.0.0.1:8991/update_user_one", formdata)
          .then((response) => alert(response.data.res),this.reload());    
      } else {
        alert(response.data.res);
        this.reload();
      }
    },
    deleteuserone(val) {
      if (val.username.length > 0) {
        let formdata = new FormData();
        formdata.append("username", val.username);
        console.log(val.username);
        axios
          .post("http://127.0.0.1:8991/del_user_one", formdata)
          .then((response) => alert(response.data.res),this.reload());    
      } else {
        alert(response.data.res);
        this.reload();
      }
    },
    SpikeSubmit(formName) {
      if (formName.name.length > 0) {
        let formdata = new FormData();
        formdata.append("username", formName.name);
        formdata.append("realname", formName.realname);
        formdata.append("userpass", formName.userpass);
        formdata.append("tel", formName.tel);
        console.log(formName);
        axios
          .post("http://127.0.0.1:8991/ins_user_one", formdata)
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
.Spike {
  width: 100%;
  min-height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.Spike-Info {
  width: 100%;
  margin-bottom: 15px;
}
.Spike-Info-li {
  width: 100%;
}
.Spike-list {
  width: 100%;
  margin-bottom: 20px;
}
.Spike-page-box {
  display: flex;
  justify-content: flex-end;
}
</style>