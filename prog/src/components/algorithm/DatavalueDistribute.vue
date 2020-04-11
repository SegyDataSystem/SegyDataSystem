<template>
    <div id="NewProject">  

        <el-dialog :visible.sync="dialogVisibleExchange" title="Color Exchange" style="width:50%;margin-left:auto;margin-right:auto;">
            <div>
                <el-table :data="tableData" style="width:200px;margin-left:auto;margin-right:auto;">
                    <el-table-column
                        prop="label"
                        label="Label"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="selection"
                        label="Selection"
                        >
                    </el-table-column>
                </el-table>
            </div>
            <div style="margin-top:20px;">
                <el-button type="primary" @click="()=>{this.$data.dialogVisibleExchange=false;}">OK</el-button>
                <el-button type="primary" @click="()=>{this.$data.dialogVisibleExchange=false;}">Cancel</el-button>
            </div>
        </el-dialog>         
        <div>
             <div class="import-title-panel">
                <span class="import-title">
                    Datavalue Distribute
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;border-top:1px solid whitesmoke">
                <!-- <el-menu  class="el-menu-demo" mode="horizontal" style="border-left:1px solid whitesmoke;border-right:1px solid whitesmoke">
                    <el-submenu>
                        <template slot="title">
                            ExpandTools
                        </template>
                        <el-menu-item @click="()=>{this.$data.showPosition = true;}">Open Cursor Position</el-menu-item>
                        <el-menu-item @click="()=>{this.$data.showPosition = false;}">Close Cirse Position</el-menu-item>
                        <el-menu-item @click="()=>{this.$data.dialogVisibleExchange = true;}">Color Exchange</el-menu-item>
                        <el-menu-item @click="()=>{this.$router.push('/DatavalueDistribute')}">Histogram display</el-menu-item>
                        
                    </el-submenu>
                    <el-menu-item>Modify Display</el-menu-item>
                </el-menu> -->
                
                <div style="margin-top:40px;margin-left:auto;margin-right:auto;" v-if="!dialogVisibleDiagram">
                    <div id="myChart" :style="{width: '300px', height: '300px'}" style="margin-left:auto;margin-right:auto;"></div>
                    
                </div>

            </div>

            <div style="margin-top:30px;" v-if="!dialogVisibleDiagram">
                    <el-button type="primary" @click="()=>{this.$router.push('/LoadColormap')}">OK</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/LoadColormap')}">Cancel</el-button>
                   
            </div>
             

            </div>

           
        </div>
        <div style="width:100%;height:50px;"></div>

    </div>
</template>

<script>

    export default {
        name: "NewProject",
        data(){
            return{
                
                range:[1200,1100,1000,900,800,700,600,500],
                x_range:[500,600,700,800,900,1000,1100,1200],
                
                x_position:0,
                y_position:0,
                start_x_scale:500,
                end_x_scale: 1200,
                start_y_scale:500,
                end_y_scale: 1200,
                standard_x_scale: 1, //换算的标准刻度
                standard_y_scale: 1, //换算的标准刻度
                dialogVisibleExchange: false,
                dialogVisibleDiagram: false,
                tableData:[
                    {
                        label:1,
                        selection:1
                    },
                    {
                        label:2,
                        selection:2
                    },
                    {
                        label:3,
                        selection:3
                    },
                    {
                        label:4,
                        selection:4
                    },
                    {
                        label:5,
                        selection:5
                    },
                ],
                option : {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220, 200, 150]
                        }
                    ]
                },
            }
        },
        mounted(){
            this.checkEcharts();
        
        },
        methods:{
            checkEcharts(){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            
            
            
            myChart.setOption(this.$data.option);
            },
            changeValue(val){
                if(val=='Use Percent%'){
                    this.$data.valueChange=true;
                    
                }else{
                    this.$data.valueChange=false;
                }
            }
        }
    }
</script>

<style scoped>
#NewProject{
    width: 100%;
    height: 100%;

}
.import-details-panel{
    width: 53%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-align: left;
}
.preview-image{
    width: 300px;
    height: 160px;
    margin-top: 10px;
    background-color: #666666;
}

.step2-panel{
    width: 88%;
    margin-left: auto;
    margin-right: auto;;
    margin-top: 20px;

}

.step4-panel{
    width: 88%;
    margin-left: auto;
    margin-right: auto;;
    margin-top: 20px;

}

.form-item-body{
    margin-top: 20px;
}
.button-panel{
    margin-top: 60px;
    width: 100%;
    height: 100px;
    text-align: center;
}
.no-first{
    margin-top: 30px;
}



.form-item-title-span{
    font-size: 18px;
    font-weight: bold;
}


    .steps-panel{
        width: 95%;
        height: 60px;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
    }
    .steps{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }

    .import-title-panel{
        width: 95%;
        height: 50px;
        line-height: 50px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 20px;
    }


    .import-title{
        font-size: 26px;
        font-weight: bold;
    }


    .useback{
        background-image: url('../../assets/useback.png');
        background-size: cover;

    }

    .middle-range{
        line-height:80px;
        position:relative;
        left:10px;
    }

    .top-range{
        line-height:80px;
        position:relative;
        bottom:40px;
        left:32px;
    }
    .scale{
        margin-left:30px;
        width:30px;
        height:80px;
        background-color:blue;
    }
</style>