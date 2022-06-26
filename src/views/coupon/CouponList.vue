<template>
  <div class="CouponList">
    <!-- 添加 -->
    <el-row :gutter="20" class="CouponList-Info">
      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
        <el-button
          type="primary"
          class="CouponList-Info-li"
          size="small"
          @click="CouponListShow = true"
          >添加数据</el-button
        >
      </el-col>

      <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
        <el-select
          clearable
          size="mini"
          v-model="deviceSNMP"
          placeholder="请选择活动区域"
          autocomplete="off"
          style="width: 100%"
        >
          <el-option
            v-for="item in deviceSNMPList.result"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
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
    <el-row class="CouponList-list">
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" label="序" width="80px">
          </el-table-column>
          <el-table-column prop="city_name" label="城市编号" width="100px">
          </el-table-column>
          <el-table-column prop="addconfirm" label="今日新增" width="100px">
          </el-table-column>
          <el-table-column prop="confirm" label="累计确诊人数" width="100px">
          </el-table-column>
          <el-table-column prop="nowConfirm" label="目前确认累计" width="100px">
          </el-table-column>
          <el-table-column prop="dead" label="死亡累计" width="100px">
          </el-table-column>
          <el-table-column prop="heal" label="治愈累计" width="100px">
          </el-table-column>
          <el-table-column prop="suspect" label="现有疑似" width="100px">
          </el-table-column>
          <el-table-column label="修改" width="100px">
            <template slot-scope="scope">
              <el-button type="text" @click="updatekeycodeinfo(scope.row)"
                >修改</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="删除" width="100px">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteepidemicinfo(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 添加或编辑关键词 -->
    <el-dialog title="添加数据" :visible.sync="CouponListShow">
      <el-form
        :model="CouponListForm"
        :rules="CouponListRules"
        ref="CouponListForm"
      >
        <el-form-item label="名称" :label-width="CouponListWidth" prop="name">
          <el-input
            v-model="CouponListForm.name"
            autocomplete="off"
            placeholder="名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CouponListSubmit(CouponListForm)" type="primary"
          >添 加</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="修改数据" :visible.sync="genggaishow">
      <el-form :model="temp" ref="temp">
        <el-form-item label="省份" :label-width="keyCodeWidth">
          <el-input v-model="temp.city_name" />
        </el-form-item>
        <el-form-item label="今日新增" :label-width="keyCodeWidth">
          <el-input v-model="temp.addconfirm" />
        </el-form-item>
        <el-form-item label="累计确诊人数" :label-width="keyCodeWidth">
          <el-input v-model="temp.confirm" />
        </el-form-item>

        <el-form-item label="当前确诊人数" :label-width="keyCodeWidth">
          <el-input v-model="temp.nowConfirm" />
        </el-form-item>
        <el-form-item label="死亡累计" :label-width="keyCodeWidth">
          <el-input v-model="temp.dead" />
        </el-form-item>
        <el-form-item label="治愈累计" :label-width="keyCodeWidth">
          <el-input v-model="temp.heal" />
        </el-form-item>
        <el-form-item label="现有疑似" :label-width="keyCodeWidth">
          <el-input v-model="temp.suspect" />
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
      CouponListShow: false,
      deviceSNMPList: [],
      deviceSNMP: "",
      temp: {
        city_name: "",
        addconfirm: null,
        confirm: null,
        nowConfirm: null,
        dead: null,
        heal: null,
        suspect: null,
      },
      keyCodeWidth: "120px",
      genggaishow: false,
      CouponListForm: {
        name: "",
        start: "",
        end: "",
        amount: 0.1,
        sum: 0.0,
        message: "",
      },

      CouponListRules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        message: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 2 到 25 个字符",
            trigger: "blur",
          },
        ],
        amount: [{ required: true, message: "请输入", trigger: "blur" }],
        sum: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        start: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        end: [{ required: true, message: "请选择结束时间", trigger: "blur" }],
      },
      CouponListWidth: "120px",
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8991/get_countryinfo_all_details")
      .then((response) => (this.tableData = response.data.result));
    axios
      .get("http://127.0.0.1:8991/get_province")
      .then((response) => (this.deviceSNMPList = response.data));
  },
  methods: {
    updatekeycodeinfo(val) {
      this.genggaishow = true;
      this.temp = Object.assign({}, val);

      // this.temp.updatetime = new Date(this.temp.updatetime);
    },
    searchword(val) {
      console.log(this.deviceSNMP);
      let formdata = new FormData();
      formdata.append("cityname", this.deviceSNMP);
      console.log(formdata);
      axios
        .post("http://127.0.0.1:8991/get_city_one", formdata)
        .then((response) => (this.tableData = response.data.result));
    },
    updateSubmit(val) {
      console.log(val);
      if (val.city_name.length > 0) {
        let formdata = new FormData();
        formdata.append("cityname", val.city_name);
        formdata.append("addconfirm", val.addconfirm);
        formdata.append("nowConfirm", val.nowConfirm);
        formdata.append("dead", val.dead);
        formdata.append("heal", val.heal);
        formdata.append("suspect", val.suspect);
        axios
          .post(
            "http://127.0.0.1:8991/update_countryinfo_all_details",
            formdata
          )
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
      if (val.id > 0) {
        console.log(val.id);
        axios
          .post("http://127.0.0.1:8991/del_countryinfo_all_details", formdata)
          .then((response) => alert(response.data.res),this.reload());    
      } else {
        alert(response.data.res);
        this.reload();
      }
    },
    CouponListSubmit(formName) {
      if (formName.name.length > 0) {
        console.log(formName.name);
        let formdata = new FormData();
        formdata.append("cityname", formName.name);
        axios
          .post("http://127.0.0.1:8991/ins_countryinfo_all_details", formdata)
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
.CouponList {
  width: 100%;
  min-height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.CouponList-Info {
  width: 100%;
  margin-bottom: 15px;
}
.CouponList-Info-li {
  width: 100%;
}
.CouponList-list {
  width: 100%;
  margin-bottom: 20px;
}
.CouponList-page-box {
  display: flex;
  justify-content: flex-end;
}
</style>