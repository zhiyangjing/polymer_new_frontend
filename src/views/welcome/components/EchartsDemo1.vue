
<template>
    <div>
        <div class="box" ref="boxRef"></div>
    </div>
</template>

<script>
import * as echart from 'echarts'
export default {
    mounted(){
        //配置选项
        let options={
            xAxis:{
                data:['成都','西安','天府']
            },
            yAxis:{},
            tooltip:{},
            legend:{},
            toolbox:{
                feature:{
                    saveAsImage:{},
                    restore:{},
                    dataView:{
                        optionToContent: function(opt) {
		            	    var axisData = opt.xAxis[0].data;
		            	    var series = opt.series;
		            	    var table = '<table class="echartsTable"><tbody><tr>'
		            	                 + '<td>时间</td>'
		            	                 + '<td>' + series[0].name + '</td>'
                                         + '<td>' + series[1].name + '</td>'
                                         + '<td>' + series[2].name + '</td>'
		            	                 + '</tr>';
		            	    for (var i = 0, l = axisData.length; i < l; i++) {
		            	        table += '<tr>'
		            	                 + '<td>' + axisData[i] + '</td>'
		            	                 + '<td>' + series[0].data[i] + '</td>'
                                         + '<td>' + series[1].data[i] + '</td>'
                                         + '<td>' + series[2].data[i] + '</td>'
		            	                 + '</tr>';
		            	    }
		            	    table += '</tbody></table>';
		            	    return table;
		            	}

                    },
                    magicType:{
                        type:['line','bar']
                    },
                    dataZoom:{}
                }
            },
            series:[
                {
                    type:'bar',
                    name:'一月招生量',
                    data:[98,67,45]
                },
                {   type:'bar',
                    name:'二月招生量',                
                    data:[98,100,6]
                },
                {   type:'bar',
                    name:'三月招生量',
                    data:[62,11,6]
                },                                        
                {    
                
                    label:{
                        show:true
                    },
                    itemStyle:{
                        color:'orange',
                    },
                    barwidth:30,
                    markpoint:{
                        data:[
                            {
                                type:'max',name:'最大值'
                            }
                        ]
                    },
                    markline:{
                        data:[
                            {
                                type:'average',name:'平均值'
                            }
                        ]
                    }
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
    .echartsTable {
	    width: 100%;
	    text-align: center;
	    min-height: 25px;
	    line-height: 20px;
	    
	    padding: 2px;
    }
    .echartsTable, .echartsTable tr th, .echartsTable tr td{
	    border: 1px solid rgb(0, 0, 0);
    } 
</style>