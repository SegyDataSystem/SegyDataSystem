<template>
    <div id="NewProject">  

        <el-dialog :visible.sync="dialogVisibleExchange" title="Color Exchange" style="width:50%;margin-left:auto;margin-right:auto;">
            <div>
                <el-row>
                    <el-col style="width:50%;">
                        <span>Label</span>
                    </el-col>
                    <el-col style="width:50%">
                        <span>Selection</span>
                    </el-col>
                </el-row>
                <el-row style="margin-top:15px;">
                    <el-col style="width:50%;">
                        <input style="width:70px;" v-model="label1" />
                    </el-col>
                    <el-col style="width:50%">
                        <input style="width:70px" v-model="selection1"/>
                    </el-col>
                </el-row>
                <el-row style="margin-top:15px;">
                    <el-col style="width:50%;">
                        <input style="width:70px;" v-model="label2" />
                    </el-col>
                    <el-col style="width:50%">
                        <input style="width:70px" v-model="selection2" />
                    </el-col>
                </el-row>
                <el-row style="margin-top:15px;">
                    <el-col style="width:50%;">
                        <input style="width:70px;" v-model="label3" />
                    </el-col>
                    <el-col style="width:50%">
                        <input style="width:70px" v-model="selection3" />
                    </el-col>
                </el-row>
                <el-row style="margin-top:15px;">
                    <el-col style="width:50%;">
                        <input style="width:70px;" v-model="label4" />
                    </el-col>
                    <el-col style="width:50%">
                        <input style="width:70px" v-model="selection4" />
                    </el-col>
                </el-row>
                <el-row style="margin-top:15px;">
                    <el-col style="width:50%;">
                        <input style="width:70px;" v-model="label5" />
                    </el-col>
                    <el-col style="width:50%">
                        <input style="width:70px" v-model="selection5" />
                    </el-col>
                </el-row>
            </div>
            <div style="margin-top:20px;">
                <el-button type="primary" @click="()=>{this.$data.dialogVisibleExchange=false;}">OK</el-button>
                <el-button type="primary" @click="()=>{this.$data.dialogVisibleExchange=false;}">Cancel</el-button>
            </div>
        </el-dialog>         
        <div>
             <div class="import-title-panel">
                <span class="import-title">
                    Load Colormap
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;border-top:1px solid whitesmoke">
                <el-menu  class="el-menu-demo" mode="horizontal" style="border-left:1px solid whitesmoke;border-right:1px solid whitesmoke">
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
                </el-menu>
                
                <div style="margin-top:40px;margin-left:auto;margin-right:auto;" v-if="!dialogVisibleDiagram">
                    <div style="width:400px;margin-left:auto;margin-right:auto;">
                        <el-row>
                            <el-col v-for="(item, index) in x_range" :key="index" :style="useTopRangeStyle" style="border-left:1px solid black;">
                                <span style="position:relative;bottom:10px;">{{item}}</span>
                            </el-col>
                        </el-row>
                    </div>
                    <el-row style="margin-left:auto;margin-right:auto;width:700px;">
                        <el-col style="width:150px;height:100px;">
                            <div style="float:right;width:50%;height:100px;;">
                                <div v-for="(item, index) in range" :key="index"  style="width:100%;height:50px;float:right;">
                                    <el-row>
                                        <el-col style="width:80%;">
                                            <span>{{item}}</span>
                                        </el-col>
                                        <el-col style="width:20%;height:50px;border-top:1px solid black">
                                        </el-col>
                                    </el-row>
                                </div>
                                
                                
                            </div>   
                        </el-col>
                        <el-col style="width:400px;height:400px;background-color:whitesmoke;" class="useback">
                            <canvas id="myCanvas" width="400" height="400"></canvas>
                        </el-col>
                        <el-col style="width:150px;height:400px;">
                            
                            <div>
                                <div  class="scale">
                                <span class="top-range">5.5</span> 
                                <span class="middle-range">5.0</span> 
                                </div>
                            </div>
                            <div>
                                <div  class="scale" style="background-color:yellow">
                                <span class="top-range">4.5</span> 
                                <span class="middle-range">4.0</span> 
                                </div>
                            </div>
                            <div>
                                <div  class="scale" style="background-color:cyan">
                                <span class="top-range">3.5</span> 
                                <span class="middle-range">3.0</span> 
                                </div>
                            </div>
                            <div>
                                <div  class="scale" style="background-color:green">
                                <span class="top-range">2.5</span> 
                                <span class="middle-range">2.0</span> 
                                </div>
                            </div>
                            <div>
                                <div  class="scale" style="background-color:red">
                                <span class="top-range">1.5</span> 
                                <span class="middle-range">1.0</span> 
                                </div>
                            </div>
                            
                        </el-col>
                    </el-row>

                    <div style="margin-top:30px;">
                        <el-row style="margin-left:auto;margin-right:auto;width:200px;height:40px;font-weight:bold" v-if="showPosition">
                            <el-col style="width:20px;">
                                X:
                            </el-col>
                            <el-col style="width:60px;">
                                {{x_position}}
                            </el-col>
                            
                        </el-row>
                        <el-row style="margin-left:auto;margin-right:auto;width:200px;height:40px;font-weight:bold" v-if="showPosition">
                            
                            <el-col style="width:20px;">
                                Y:
                            </el-col>
                            <el-col style="width:60px;">
                                {{y_position}}
                            </el-col>
                        </el-row>

                        
                        
                    </div>
                    <div v-if="dialogVisibleDiagram">
                        <div style="margin-top:40px;">
                            <div>
                                <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
                            </div>

                        </div>

                    </div>
                    
                </div>

            </div>

            <div style="margin-top:30px;" v-if="!dialogVisibleDiagram">
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">OK</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
                   
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
                showPosition:false,
                choosedData:'dn_rms_poststackamplitude',
                step:2,
                valueChange:true,
                radio:'Use Percent%',
                horizonSelect:'0',
                horizonSelect1:'0',
                
                range:[1200,1100,1000,900,800,700,600,500],
                x_range:[500,600,700,800,900,1000,1100,1200],
                useTopRangeStyle:{
                    width: '50px'
                },
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
                            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                            data:[10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                },
                label1:1,
                label2:2,
                label3:3,
                label4:4,
                label5:5,
                selection1:1,
                selection2:2,
                selection3:3,
                selection4:4,
                selection5:5

            }
        },
        mounted(){

            let num = 400 / this.$data.x_range.length;
            this.$data.useTopRangeStyle.width = num;
            this.$data.standard_x_scale =  parseFloat(parseFloat(1.0 * this.$data.end_x_scale - this.$data.start_x_scale)/400.0);
            this.$data.standard_y_scale =  (1.0 * this.$data.end_y_scale - this.$data.start_y_scale)/400.0;
            window.console.log(this.$data.standard_x_scale);        
            window.console.log(this.$data.standard_y_scale);        

            var canvas = document.getElementById('myCanvas');
            let _this = this;
            canvas.onmousemove=function(event){
                var rect = canvas.getBoundingClientRect();
                
                var x = _this.$data.start_x_scale + event.clientX - rect.left * (canvas.width / rect.width)-0.515625;
                var y = _this.$data.start_x_scale + 400 - (event.clientY - rect.top * (canvas.height / rect.height));
                _this.$data.x_position = x * _this.$data.standard_x_scale;
                _this.$data.y_position = y * _this.$data.standard_y_scale;
                

            }
        
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
        background-image: url('../assets/useback.png');
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