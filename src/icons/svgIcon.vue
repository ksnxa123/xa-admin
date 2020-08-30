<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name:"svgIcon",
    data(){
        return{
            msg:'xa',
            num : 1
        }
    },
    props:{
        iconClass:{
            type:String,
            default:''
        },
        className:{
            type:String,
            default:''
        }
    },
    computed:{
        iconName(props){
            return `#icon-${props.iconClass}`
        },
        svgClass(props){
            if(props.className) {
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>