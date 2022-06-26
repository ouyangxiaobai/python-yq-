<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <!-- 登录面板 -->
    <div class="login-box">
      <div class="login-box-title">注册界面</div>
      <div class="login-box-from">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="demo-ruleForm"
        >

          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="medium"
            >
              <el-button slot="prepend" icon="el-icon-user"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              size="medium"
            >
              <el-button slot="prepend" icon="el-icon-key"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item prop="real_name">
            <el-input
              v-model="loginForm.real_name"
              placeholder="请输入真实姓名"
              size="medium"
            >
              <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item prop="tel">
            <el-input
              v-model="loginForm.tel"
              placeholder="请输入电话号码"
              size="medium"
            >
              <el-button slot="prepend" icon="el-icon-phone"></el-button>
            </el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              style="width: 100%"
              @click="register()"
              >立即注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../node_modules/axios";
export default {
  inject: ['reload'],
  data() {
    let letterRulename = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]{3,18}$/;
      if (value === "") {
        callback(new Error("输入内容不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入字母、数字、下划线"));
      } else {
        callback();
      }

    };

    let letterRulepassword = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]{6,16}$/;
      if (value === "") {
        callback(new Error("输入内容不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入字母、数字、下划线"));
      } else {
        callback();
      }
     };
  
    let letterRuletel = (rule, value, callback) => {
      let reg = /^[0-9]{11}$/;
      if (value === "") {
        callback(new Error("输入内容不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入11位数字"));
      } else {
        callback();
      }
     };

    return {
      loading: false, //登陆状态
      loginForm: {
        // 登陆表单
        username: "",
        password: "",
        real_name: "",
        tel: "",
      },
      loginstatus: "null",
      rules: {
        //登陆验证规则
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
          { validator: letterRulename, trigger: "blur" },
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: letterRulepassword, trigger: "blur" },
        ],

        tel: [
          { required: true, message: "请输入电话号码（11位）", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为11个字符",
            trigger: "blur",
          },
        ],
        
      },
    };
  },
  methods: {
    register() {
      // console.log(this.loginForm.username);
      let formdata = new FormData();
      formdata.append("username", this.loginForm.username);
      formdata.append("password", this.loginForm.password);
      formdata.append("real_name", this.loginForm.real_name);
      formdata.append("tel", this.loginForm.tel);

      console.log(formdata);
      axios
        .post("http://127.0.0.1:8991/register_user", formdata)
        .then((response) => {
          if (response.data.res == 1) {
              alert("注册成功");
              console.log(response.data.res);
              // 登陆成功后重定向
              this.$router.push({
                path: this.$route.query.redirect || "/login",
              });            
          } else {
              alert(response.data.res);
              console.log(response.data.res);
              this.reload();
              return false;
          }
          // resolve();
        });

    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  /* display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/image/login.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #cccccc; */
  position: relative;
}
.login-bg {
  width: 100%;
  height: 100%;
  background: #3e3e3e;
}
.login-box {
  width: 350px;
  /* height: 287px; */
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 5px;
  box-shadow: 0 0 2px #f7f7f7;
  border: 1px solid #f7f7f7;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -200px;
}
.login-box-title {
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid #ffffff;
}
.login-box-from {
  width: 100%;
  height: auto;
  padding: 30px;
  box-sizing: border-box;
}
</style>