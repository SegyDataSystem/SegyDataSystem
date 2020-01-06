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
                            <el-select size="small" v-model="horizonSelect" style="width:80%" @change="changeSelection">
                                <el-option value="Horizon" label="Horizon"></el-option>
                                <el-option value="Interval" label="Interval"></el-option>
                                <el-option value="Seismic" label="Seismic 3D"></el-option>
                                <el-option value="Wells" label="Wells"></el-option>
                                <el-option value="Fault" label="Fault"></el-option>
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
                                <option v-for="(item,index) in selectOptionsAttribute" :key="index" :value="item.id" :label="item.realName"></option>
                            </select>

                        </div>
                        
                    </el-col>
                    <el-col style="width:49%;margin-left:1%;text-align:left">
                        <div >
                            <el-select size="small" v-model="horizonSelect1" style="width:80%" >
                                <el-option v-for="(item, index) in selectOptions" :value="index" :label="item" :key="index">Dip</el-option>
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
<!--                    <el-button type="primary" @click="()=>{this.$router.push({path:'/Result',query:{file: this.downloadFileList[selectType],radio: this.radio}})}">Start</el-button>-->
                    <el-button type="primary" @click="startStand">Start</el-button>
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
                horizonSelect:'请选择',
                horizonSelect1:'',
                selectType:'',
                tableData:[
                    {
                        name:'Throw'
                    },
                    {
                        name:'Dip'
                    },
                    
                ],
                downloadFileList:[],
                selectOptions:[],
                selectOptionsAttribute:[]
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
            startStand(){
              this.$message({
                  type:'success',
                  message:'run successful'
              });
              this.$router.push('/');
            },
            changeSelection(){
                window.console.log('dwjdiwd');
                // let _this = this;
                let tempOptions = [];
                let tempOptionsAttribute = [];
                if(this.$data.horizonSelect==='Horizon'){
                    tempOptions = this.$Global.projectDetails.subProjectList[1].file.realName;
                    if(this.$Global.projectDetails.subProjectList[1].dataMiningList[5].fileList) {
                        for (let index = 0; index < this.$Global.projectDetails.subProjectList[1].dataMiningList[5].fileList.length; index++) {
                            tempOptionsAttribute.push(this.$Global.projectDetails.subProjectList[1].dataMiningList[5].fileList[index]);
                        }
                    }
                }else if(this.$data.horizonSelect === 'Seismic'){
                    tempOptions = this.$Global.projectDetails.subProjectList[0].file.realName;
                    if(this.$Global.projectDetails.subProjectList[0].dataMiningList[5].fileList) {
                        for (let index = 0; index < this.$Global.projectDetails.subProjectList[0].dataMiningList[5].fileList.length; index++) {
                            tempOptionsAttribute.push(this.$Global.projectDetails.subProjectList[0].dataMiningList[5].fileList[index]);
                        }
                    }
                }else if(this.$data.horizonSelect === 'Interval'){
                    tempOptions = this.$Global.projectDetails.subProjectList[2].file.realName;
                    if(this.$Global.projectDetails.subProjectList[2].dataMiningList[5].fileList) {
                        for (let index = 0; index < this.$Global.projectDetails.subProjectList[2].dataMiningList[5].fileList.length; index++) {
                            tempOptionsAttribute.push(this.$Global.projectDetails.subProjectList[2].dataMiningList[5].fileList[index]);
                        }
                    }
                }else if(this.$data.horizonSelect === 'Wells'){
                    tempOptions = this.$Global.projectDetails.subProjectList[3].file.realName;
                    if(this.$Global.projectDetails.subProjectList[3].dataMiningList[5].fileList) {
                        for (let index = 0; index < this.$Global.projectDetails.subProjectList[3].dataMiningList[5].fileList.length; index++) {
                            tempOptionsAttribute.push(this.$Global.projectDetails.subProjectList[3].dataMiningList[5].fileList[index]);
                        }
                    }
                }else{
                    tempOptions = this.$Global.projectDetails.subProjectList[4].file.realName;
                    if(this.$Global.projectDetails.subProjectList[4].dataMiningList[5].fileList) {
                        for (let index = 0; index < this.$Global.projectDetails.subProjectList[4].dataMiningList[5].fileList.length; index++) {
                            tempOptionsAttribute.push(this.$Global.projectDetails.subProjectList[4].dataMiningList[5].fileList[index]);
                        }
                    }
                }
                this.horizonSelect1 = tempOptions;
                this.selectOptionsAttribute = tempOptionsAttribute;
            },
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