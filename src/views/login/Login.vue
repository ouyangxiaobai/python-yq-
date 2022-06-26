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
      <div class="login-box-title">疫情管理系统</div>
      <div class="login-box-from" align="center">
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
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              style="width: 45%"
              @click="submitForm('loginForm')"
              >立即登陆</el-button
            >
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              style="width: 45%"
              @click="register()"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  inject: ["reload"],
  name: 'login',
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
    return {
      loginForm: {
        // 登陆表单
        username: "",
        password: "",
      },
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
      },
      loading: false, //登陆状态   
      loginstatus: "null",
    }
  },
  methods: {
    register() {
      // 注册后重定向
      this.$router.push("/register");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true;
        this.login();
        if (valid) {
        } else {
          this.reload();
          // console.log('error submit!!');
          return false;
        }
      });
    },
    login() {
      this.$store
        .dispatch("user/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then(() => {
          this.loading = true;
          // 登陆成功后重定向
          this.$router.push({
            path: this.$route.query.redirect || "/index",
          });
        })
        .catch(err => {
          console.log(err)
        })
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
  background: #3f3d3d;
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
  margin-top: -150px;
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