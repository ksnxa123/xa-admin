<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tap">
        <li
          v-for="item in menuTap"
          :key="item.id"
          :class="{ current: item.current }"
          @click="changeMenu(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')" :disabled="loginButtonStatus">{{model === 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validata';
import {GetSms,Register,Login} from '@/api/login';
import { Message } from 'element-ui';


export default {
  name: "login", 
  //验证用户名
  data() {
    var valiUsername = (rule, value, callback) => {
      if (value==='') {
        callback(new Error('请输入用户名'));
      }else if(validateEmail(value)){
        callback(new Error('用户名格式有误'));
      }else{
        callback();//true
      }
    };
    //验证密码
    var valiPassword = (rule, value, callback) => {
      this.ruleForm.password=stripscript(value);
      value=this.ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(validatePass(value)) {
        callback(new Error('密码为6到20位数字+字母'));
      }else{
        callback();
      }
    };
    //再次确定密码
    var valiPasswords = (rule, value, callback) => {
      if(this.model.value==="login"){callback()};
      this.ruleForm.passwords=stripscript(value);
      value=this.ruleForm.passwords;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if(!(value === this.ruleForm.password)){
        callback(new Error('两次密码不一致'));
      }else{
        callback();
      }
    };
    //验证验证码
    var valiCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (validateVCode(value)) {
        callback(new Error('验证码格式有误!'));
      } else {
        callback();
      }
    };
    return {
      menuTap: [
        { text: "登录", current: true,type:'login' },
        { text: "注册", current: false,type:'register'}
      ],
      timer:null,
      //登录按钮禁用状态
      loginButtonStatus: true,
      //验证码禁用状态
      codeButtonStatus:{
        status:false,
        text:'获取验证码'
      },
      //模块值
      model:'login',
      //表单绑定数据
      ruleForm: {
        username: '',
        password: '',
        passwords:'',
        code: ''
      },
      //表单验证
      rules: {
        username: [
          { validator: valiUsername, trigger: 'blur' }
        ],
        password: [
          { validator: valiPassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: valiPasswords, trigger: 'blur' }
        ],
        code: [
          { validator: valiCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //切换模块
    changeMenu(data) {
      this.menuTap.forEach(element => {
        element.current = false;
      });
      data.current = true;
      this.model = data.type;
      //重置表单
      this.$refs.ruleForm.resetFields();
      //清除定时器
      this.clearCountDown();
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证通过
        if (valid) {
          this.model === 'login' ? this.login() : this.register()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 登录
    login(){
      let resquestData = {
        username:this.ruleForm.username,
        password:sha1(this.ruleForm.password),
        code:this.ruleForm.code
      }
      this.$store.dispatch('app/login',resquestData).then(response => {
        this.$router.push({
          name:'Backcontrol'
        })
      }).catch(error => {
        // 重置数据
      })
    },
    //注册
    register(){
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        module: 'register'
      }
      Register(requestData).then(response => {
        //模拟注册成功
        this.changeMenu(this.menuTap[0])
        this.clearCountDown()

        let data = response.data
        this.$message({
          message: data.message,
          type: 'success'
        });
      }).catch(error => {
        //重置数据
      })
    },
    //清除表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码
    getSms(){
      //提示
      if(this.ruleForm.username==''){
          Message.error('邮箱不能为空！!');
          return false;
      }
      if(validateEmail(this.ruleForm.username)){
        Message.error('邮箱格式错误！')
        return false;
      }
      //获取验证码
      let requestData={
        username:this.ruleForm.username,
        module:this.menuTap.type,
      }
      //修改获取验证码状态
      this.codeButtonStatus.status=true
      this.codeButtonStatus.text='发送中'
      //延时时间
      setTimeout(()=>{
        GetSms(requestData).then(response=>{
          let data = response.data
          this.$message({
            message: response.message,
            type: 'success'
          });
          //启用注册登录按钮
          this.loginButtonStatus=false
          //调用定时器
          countDown(60)
        }).catch(error=>{
          console.log(error)
        })
      },3000)
      //倒计时
      const countDown = ((num)=>{
        if(this.timer) {clearInterval(this.timer)}

        let time=num
        this.timer = setInterval(()=>{
          time--;
          if(time===0){
            clearInterval(this.timer)
            this.codeButtonStatus.status=false
            this.codeButtonStatus.text = "再次获取"
          }else{
            this.codeButtonStatus.text = `倒计时${time}秒`
          }
        },1000)
      })
    },
    //清除倒计时
    clearCountDown() {
      //还原状态
      this.codeButtonStatus.status = false
      this.codeButtonStatus.text = '获取验证码'
      //清除倒计时
      clearInterval(this.timer)
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tap {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form{
  margin-top: 29px;
  label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form{margin-bottom: 13px;}
  .block{
    display: block;
    width: 100%;
  }
  .login-btn{margin-top: 19px;}
}
</style>
