<template>
  <div id="header-wrap">
      <div class="pull-left header-icon" @click="hideNav">
        <svg-icon iconClass="menu" className="menu" />
      </div>
      <div class="pull-right header-icon">
        <div class="user-info pull-left">
          <img src="../../../assets/images/face.jpg" alt="">
          管理员
        </div>
        <div class="header-icon pull-right">
          <svg-icon iconClass="close" className="close" />
        </div>
      </div>
  </div>
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
@import '../../../styles/config.scss';
#header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
    @include webkit(transition, all .3s ease 0s);
}
.header-icon{
  padding: 0 32px;
  svg{
    margin-bottom: -8px;
    font-size: 25px;
    cursor:pointer;
  }
}
.user-info{
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon{
    padding: 0 28px;
  }
  img{
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 36px;
    width: 36px;
    height: 36px;
  }
}
.open {
    #header-wrap { left: $navMenu; }
}
.close {
    #header-wrap { left: $navMenuMin; }
}
</style>