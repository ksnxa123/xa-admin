<template>
    <el-container id="layout-container">
    <el-aside id="layout-aside" :width="collapse === true ? '60px' : '250px'"><LayoutNav/></el-aside>
        <el-container>
            <el-header id="layout-header" height="75px"><LayoutHeader/></el-header>
            <el-main id="layout-main"><LayoutMain/></el-main>
        </el-container>
    </el-container>
</template>

<script>
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
export default {
    name:'layout',
    components:{
        LayoutHeader,
        LayoutMain,
        LayoutNav
    },
    computed:{
        collapse(){
            return this.$store.state.app.isCollapse      
        }
    }
}
</script>

<style lang="scss" scpoed>
#layout-container { height: 100vh; }
#layout-aside {
    background-color: #344a5f;
    @include webkit(transition, all .3s ease 0s);
}
#layout-header {
    position: relative;
    z-index: 10;
    @include webkit(box-shadow, 0 0 30px 0 rgba(0, 0, 0, .2));
}
#layout-main {
    border: 30px solid #f7f7f7;
    background-color: #fff;
    padding: 30px;
}
</style>