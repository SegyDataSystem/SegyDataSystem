<template>
    <div id="NewProject">           
        <div v-if="step===1">
             <div class="import-title-panel">
                <span class="import-title">
                    Standardization
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                <el-row style="width:100%">
                    <el-col style="width:50%;text-align:left">
                        <div >
                            <el-select size="small" v-model="horizonSelect" style="width:80%" disabled>
                                <el-option value="0" label="Horizon"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:20px;width:80%">
<!--                            <el-table-->
<!--                                    ref="multipleTable"-->
<!--                                    :data="tableData"-->
<!--                                    tooltip-effect="dark"-->
<!--                                    style="width: 98%;border:1px solid lightgray;font-szie:10px;"-->
<!--                                    max-height="330"-->
<!--                                    >-->
<!--                                    <el-table-column-->
<!--                                    type="selection"-->
<!--                                    width="55">-->
<!--                                    </el-table-column>-->
<!--                                    <el-table-column prop="name" label="Name" width="300" style="font-size:8px;">-->
<!--                                    </el-table-column>-->
<!--                                </el-table>-->
                            <select multiple="multiple" style="width: 80%;height:100px;" v-model="selectType">
                                <option v-for="(item, index) in downloadFileList" :value="index" :label="item.realName" :key="index">Dip</option>
                            </select>

                        </div>
                        
                    </el-col>
                    <el-col style="width:49%;margin-left:1%;text-align:left">
                        <div >
                            <el-select size="small" v-model="horizonSelect1" style="width:80%" disabled>
                                <el-option value="0" label="Curvedness"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:20px;width:80%">
                            <el-radio v-model="radio" label="MAX_MIN" value="MAX_MIN">Max-Min</el-radio>
                            <el-radio v-model="radio" label="Z_SCORE" value="Z_SCORE">Z-Score</el-radio>
                        </div>
                    </el-col>

                </el-row>

            </div>

            <div style="margin-top:30px;">
                    <el-button type="primary" @click="()=>{this.$router.push({path:'/Result',query:{file: this.downloadFileList[selectType],radio: this.radio}})}">Start</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
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
                step:1,
                radio:'MAX_MIN',
                horizonSelect:'0',
                horizonSelect1:'0',
                selectType:'',
                tableData:[
                    {
                        name:'Throw'
                    },
                    {
                        name:'Dip'
                    },
                    
                ],
                downloadFileList:[]
            }
        },
        mounted(){
            let _this = this;
            this.$axios({
                method:'get',
                url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

            }).then((response)=>{
                _this.downloadFileList = response.data;
                window.console.log(response.data);
            });
           
        
        },
        methods:{
            startCalculate(){
                // let _this = this;
                this.$axios({
                    method:'post',
                    url: '/datamining',
                    data:{
                        dataMiningMethod:this.$data.selectType,
                        parameters:[

                        ],
                        workZone:{

                        },
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id
                    }
                })
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