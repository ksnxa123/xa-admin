<template>
  <el-row>
    <el-col :span="12">
      <span class="menu-btn" @click="hideNav">
        <svg-icon iconClass="menu" className="menu" />
      </span>
    </el-col>
    <el-col :span="12">
      <span class="logout">
        <svg-icon iconClass="close" className="close" />
      </span>
      <div class="face-info">
        <img src="../../../assets/images/face.jpg" alt="">
        <span class="name">管理员</span>   
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name:'menuHeader',
  methods:{
    ...mapMutations('app',{
      changeNav:"SET_NAV"
    }),
    hideNav(){
      this.changeNav()
    }
  },
}
</script>

<style lang="scss" scoped>
.menu-btn { 
  display: inline-block;
  padding-top: 24px;
  font-size: 25px;
  cursor: pointer;
}
.logout {
  float: right;
  border-left: 1px solid #ededed;
  width: 75px;
  text-align: center;
  line-height: 75px;
  font-size: 25px;
  margin-right: -20px;
  cursor: pointer;
}
.face-info {
  float: right;
  padding: 18px 30px 0 0;
  img {
    display: inline-block;
    vertical-align: middle;
    border-radius: 100px;
    margin-right: 18px;
    width: 36px;
    height: 36px;
  }
}
</style>