<template>
    <div>
        <div class="box" ref="boxRef"></div>
    </div>
</template>

<script>
import * as echart from 'echarts'
export default {
    mounted(){
        let options={
            title:{
                text:'材料使用率统计'
            },
            series:[
                {
                    type:'pie',
                    data:[
                        {name:'材料一',value:56},
                        {name:'材料二',value:156},
                        {name:'材料三',value:46},
                        {name:'材料四',value:6},
                        {name:'材料五',value:2}
                    ]
                }
            ]
        }
        
        //初始化echarts
        let mychart=echart.init(this.$refs.boxRef)//mychart叫啥都行
        mychart.setOption(options)
    }
    
}
</script>

<style scoped lang="scss">
    .box{
        width: 500px;
        height: 500px;
        background-color:rgb(255, 255, 255);
    }
</style>