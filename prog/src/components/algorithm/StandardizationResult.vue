<template>
    <div id="NewProject">           
        <div>
             <div class="import-title-panel">
                <span class="import-title">
                    Standardization
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                <div class="import-title-panel">
                <span class="import-title">
                    {{choosedData}}
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                <div class="form-item-body" style="margin-top:5px;">
                    <div id="myChart1" :style="{width: '300px', height: '300px'}" style="margin-left:auto;margin-right:auto"></div>
                </div>
                <div style="margin-top:10px;">
                    <el-row style="width:100%">
                        <el-col style="width:33%">
                            <div>
                                <el-radio v-model="radio" label="Use Min and Max" @change="changeValue"></el-radio>
                            </div>
                            <div style="margin-top:15px;">
                                <el-radio v-model="radio" label="Use Percent%" @change="changeValue"></el-radio>
                            </div>
                        </el-col>
                        <el-col style="width:33%;text-align:right">
                            <div>
                                <span>Min:</span>
                                <input style="width:100px;" :disabled="valueChange"/>
                            </div>
                            <div style="margin-top:15px;" >
                                <span>Lower:</span>
                                <input style="width:100px;" :disabled="!valueChange" />
                            </div>
                        </el-col>
                        <el-col style="width:33%;text-align:right">
                            <div>
                                <span>Max:</span>
                                <input style="width:100px;" :disabled="valueChange"/>
                            </div >
                            <div style="margin-top:15px;">
                                <span>Higher:</span>
                                <input style="width:100px;" :disabled="!valueChange"/>
                            </div>
                        </el-col>
                    </el-row>
                </div>

            </div>

            <div style="margin-top:30px;">
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">OK</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel All</el-button>
                    <el-button type="primary" @click="startCalculate">Apply</el-button>
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
                choosedData:'dn_rms_poststackamplitude',
                step:2,
                valueChange:true,
                radio:'Use Percent%',
                horizonSelect:'0',
                horizonSelect1:'0',
                tableData:[
                    {
                        name:'dn_rms_poststackamplitude'
                    },
                    
                ],
            }
        },
        mounted(){
            if(this.$route.query){
                this.choosedData = this.$route.query.file.realName;
            }
           
            /**
             * 修改图表处
             */
            let myChart = this.$echarts.init(document.getElementById('myChart1'));
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['50', '100', '150', '200', '250', '300', '350']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [-5, 0, 5, 0, -5, 0, 5],
                    type: 'line',
                    smooth: true
                }]
            });
            this.$data.step=1;
        
        },
        methods:{
            changeValue(val){
                if (val === 'Use Percent%') {

                    this.$data.valueChange = true;

                } else {
                    this.$data.valueChange = false;
                }

            },
            startCalculate(){
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.$route.query.radio,
                        parameters:[],
                        workZone:{

                        },
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileIdList:[
                            this.$route.query.file.id
                        ]
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push({path:'/',query:{a:'a'}})
                })

                // this.$router.push({path:'/',query:{a:'a'}})
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
</style>