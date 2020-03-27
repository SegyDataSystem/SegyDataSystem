<template>
    <div>
        <div>jdiwjdiw</div>
        <div id="myChart" style="width:400px;height:400px;"></div>
    </div>    
</template>
<script>
export default {
    name: 'test',
    data(){
        return{
        
        }
    },
    mounted(){
        let xData = [];
        let yData = [];
        let data = [];
        for(let i = 480; i < 1180; i++){
            xData.push(i);
        }

        for(let i = 470; i < 1170; i++){
            yData.push(i);
        }

        for(let i = 480; i < 1180; i++){
            for(let j = 470; j < 1170; j++){
                data.push([i,j, Math.random()*5]);
                // window.console.log(Math.random());
            }
        }

        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        var option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'category',
                data: yData
            },
            visualMap: {
                min: 0,
                max: 5,
                calculable: true,
                realtime: false,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            series: [{
                name: 'Gaussian',
                type: 'heatmap',
                data: data,
                emphasis: {
                    itemStyle: {
                        borderColor: '#333',
                        borderWidth: 1
                    }
                },
                progressive: 1000,
                animation: false
    }]
        
        };

    myChart.setOption(option);

    }
    
}
</script>
<style scoped>

</style>