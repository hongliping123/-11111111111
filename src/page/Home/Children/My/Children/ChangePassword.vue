<template>
  <div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="input">
          <p>原密码</p>
          <el-input placeholder="请输入原密码" style="width: 420px;" v-model="password" type="password"></el-input>
        </div>
        <div class="input">
          <p>新密码</p>
          <el-form-item prop="newPassword">
            <el-input placeholder="请输入新密码" style="width: 420px;" v-model="ruleForm.newPassword" type="password"></el-input>
          </el-form-item>
        </div>
        <div class="input">
          <p>确认密码</p>
          <el-form-item prop="checkPassword">
            <el-input placeholder="请再次输入新密码" style="width: 420px;" v-model="ruleForm.checkPassword" type="password"></el-input>
          </el-form-item>
        </div>
        <el-button type="primary" style="width:190px;margin-top:40px;margin: 0 auto;display: block;" @click="submit">确认修改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let passwordCheck1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (
        !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(value)
      ) {
        callback(new Error("请输入8-20位非纯数字或字母的密码!"));
      } else {
        callback();
      }
    };
    let passwordCheck2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      password: "",
      ruleForm:{
        newPassword: "",
        checkPassword: "",
      },
      rules: {
        newPassword: [{ validator: passwordCheck1, trigger: "blur" }],
        checkPassword: [{ validator: passwordCheck2, trigger: "blur" }]
      }
    }
  },
  methods: {
    submit() {
      if(this.password==''){
        this.$message.warning(`请输入原密码！`);
        return
      }
      if(this.ruleForm.newPassword==''){
        this.$message.warning(`请输入新密码！`);
        return
      }
      if(this.ruleForm.newPassword==this.ruleForm.checkPassword){
        this.$message.warning(`两次密码不一致！`);
        return
      }
      const params = {
        userId: this.$store.state.userInfo.userId,
        userPassword: this.password,
        newPassword: this.ruleForm.newPassword,
        confirmPassword: this.ruleForm.checkPassword
      };
      this.$post("/my/update/pwd", params, res => {
        this.$message.success("修改成功");
        this.password = '';
        this.ruleForm.newPassword = '';
        this.ruleForm.checkPassword = '';
        this.$router.push({path: '/index/my'})
      });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  @include flex(column);
  .input {
    width: 540px;
    @include flex(null, space-between);
    margin: 20px 0;
  }
}
</style>