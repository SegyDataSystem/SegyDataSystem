<template>
    <div id="NewProject" v-loading="isLoading">
        <div class="import-title-panel">
            <span v-if="step<=2" class="import-title">
                Feature Extraction Step {{step}} of 2
            </span>
            <span v-if="step>2" class="import-title">
                Feature Extraction - {{select5}}
            </span>
        </div>

        <div class="import-details-panel">
            <div v-if="step===1">
                <div class="form-item-title">
                    <span class="form-item-title-span">Data Selection</span>
                </div>
                <div class="form-item-body">
                    <el-select v-model="select1" placeholder="select..."  @change="getSecondOptions">
                        <el-option v-for="(item,index) in optionsSelect1" :value="index" :label="item.name" :key="index"></el-option>
                    </el-select>
                    <el-select v-model="select2" placeholder="select..." style="margin-left:60px;" :disabled="canSelect" @change="getAllFiles">
                        <el-option v-for="(item,index) in optionsSelect2" :value="index" :label="item.name" :key="index"></el-option>
                    </el-select>
                </div>
                <div class="form-item-body">
                    <el-transfer v-model="value" :data="tableData" @change="changeChoose" :titles="['Uploaded Files', 'Chosed Files']"></el-transfer>
                </div>
                <div class="form-item-body">
                    <el-button type="primary">Show Correlation Diagram</el-button>
                    <el-button type="primary">Show Histogram</el-button>
                </div>
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="goNextStep">Next</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
            </div>
        
            <div v-if="step===2">
                <div class="form-item-title">
                    <span class="form-item-title-span">Feature Extraction Method</span>
                </div>
                <div class="form-item-body">
                    <el-select v-model="select5" placeholder="select...">
                        <el-option value="PCA" label="PCA"></el-option>
                        <el-option value="ICA" label="ICA"></el-option>
                        <el-option value="LPP" label="LPP"></el-option>
                        <el-option value="NPE" label="NPE"></el-option>
                        <el-option value="LLE(none)" label="LLE(none)"></el-option>
                        <el-option value="ISOMAP(none)" label="ISOMAP(none)"></el-option>
                        <el-option value="ISOMAPⅡ(none)" label="ISOMAPⅡ(none)"></el-option>

                    </el-select>
                </div>
                
                <div class="form-item-title" style="margin-top:40px;">
                    <span class="form-item-title-span">Dataset Range</span>
                </div>
                <div class="form-item-body">
                    <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>From</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>To</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Step</span>
                    </el-col>
                </el-row>
                <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Inline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineStep" />
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Crossline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineStep" />
                    </el-col>
                </el-row>
                </div>
                <div class="form-item-title" style="margin-top:40px;">
                    <span class="form-item-title-span">Output Range</span>
                </div>
                <div class="form-item-body">
                    <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>From</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>To</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Step</span>
                    </el-col>
                </el-row>
                <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Inline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineStep" />
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Crossline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineStep" />
                    </el-col>
                </el-row>
                </div>
                
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="()=>{this.$data.step=1;}">back</el-button>
                    <el-button  @click="()=>{
                        this.$data.step=3;
                    }">FInish</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
            </div>

            <div v-if="step===3">
                <div v-if="select5==='PCA'">

                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">PCA(Principal Component Analysis)</span>
                    </div>

                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Energy Value:</span>
                            <input style="width:100px;" v-model="parameterPCA[0].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Extracted Dimensions:</span>
                            <input style="width:100px;" v-model="parameterPCA[1].value" />
                        </div>
                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <el-table :data="chosedFileList" style="width:200px;">
                            <el-table-column
                            label="selected features"
                            prop="realName">
                            </el-table-column>
                        </el-table>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculatePCA">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Save</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='ICA'">

                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">{{select5}}</span>
                    </div>

                    <div class="form-item-body">

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Dimensions:</span>
                            <input style="width:100px;" v-model="parameterICA[0].value" />
                        </div>
                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <el-table :data="chosedFileList" style="width:200px;">
                            <el-table-column
                                    label="selected features"
                                    prop="realName">
                            </el-table-column>
                        </el-table>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateICA">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Save</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='LPP'">

                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">{{select5}}</span>
                    </div>

                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">K-Neighbour:</span>
                            <input style="width:100px;" v-model="parameterLPP[0].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Extracted Dimensions:</span>
                            <input style="width:100px;" v-model="parameterLPP[1].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Sigma:</span>
                            <input style="width:100px;" v-model="parameterLPP[2].value" />
                        </div>
                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <el-table :data="chosedFileList" style="width:200px;">
                            <el-table-column
                                    label="selected features"
                                    prop="realName">
                            </el-table-column>
                        </el-table>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateLPP">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Save</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='NPE'">

                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">{{select5}}</span>
                    </div>

                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">K-Neighbour:</span>
                            <input style="width:100px;" v-model="parameterNPE[0].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Extracted Dimensions:</span>
                            <input style="width:100px;" v-model="parameterNPE[1].value" />
                        </div>

                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <el-table :data="chosedFileList" style="width:200px;">
                            <el-table-column
                                    label="selected features"
                                    prop="realName">
                            </el-table-column>
                        </el-table>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateNPE">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Save</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='LLE'">

                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">{{select5}}</span>
                    </div>

                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">K-Neighbour:</span>
                            <input style="width:100px;" v-model="parameterLLE[0].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Extracted Dimensions:</span>
                            <input style="width:100px;" v-model="parameterLLE[1].value" />
                        </div>

                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <el-table :data="chosedFileList" style="width:200px;">
                            <el-table-column
                                    label="selected features"
                                    prop="realName">
                            </el-table-column>
                        </el-table>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateLLE">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Save</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "NewProject",
        data(){
            const generateData = _ => {
            const data = [];
            window.console.log(_);
            
                data.push({
                    key: 1,
                    label: 'SRC_dn_rms_poststackamplitude',
                    disabled: false
                });
                
                return data;
            };
            return{
                optionsSelect1:[

                ],
                optionsSelect2:[

                ],
                chooseFloat:'IBM',
                checkInvalid:true,
                select1: 5,
                select2:'',
                select3:'0',
                select4:'0',
                select5:'PCA',
                isLoading:false,
                data: generateData(),
                value: [],
                step:1,
                tableData:[

                ],
                downloadFileList:[],
                chosedFileList:[],
                workZone:{
                    id:'',
                    inlineFrom:this.$Global.projectDetails.workZone.inlineFrom,
                    inlineTo:this.$Global.projectDetails.workZone.inlineTo,
                    inlineStep:this.$Global.projectDetails.workZone.inlineStep,
                    xlineFrom:this.$Global.projectDetails.workZone.xlineFrom,
                    xlineTo:this.$Global.projectDetails.workZone.xlineTo,
                    xlineStep:this.$Global.projectDetails.workZone.xlineStep,
                    timeFrom:this.$Global.projectDetails.workZone.timeFrom,
                    timeStep:this.$Global.projectDetails.workZone.timeStep,
                    timeTo:this.$Global.projectDetails.workZone.timeTo,
                },
                parameterPCA:[
                    {
                        name:'Energy Value',
                        value: ''
                    },
                    {
                        name:'Extracted Dimensions',
                        value: ''
                    }
                ],
                parameterICA:[
                    {
                        name:'Dimensions',
                        value: ''
                    }
                ],
                parameterLPP:[
                    {
                        name:'K-Neighbour',
                        value: ''
                    },
                    {
                        name:'Extracted Dimensions',
                        value: ''
                    },
                    {
                        name:'Sigma',
                        value:''
                    }
                ],
                parameterNPE:[
                    {
                        name:'K-Neighbour',
                        value: ''
                    },
                    {
                        name:'Extracted Dimensions',
                        value: ''
                    }
                ],
                parameterLLE:[
                    {
                        name:'K-Neighbour',
                        value: ''
                    },
                    {
                        name:'Extracted Dimensions',
                        value: ''
                    }
                ],

            }
        },
        mounted() {

            
            //获取第一个选择框
            let project = this.$Global.projectDetails.subProjectList;

            for(let index = 0; index < project.length; index++){
                this.$data.optionsSelect1.push({
                    name:project[index].type
                });
            }
            this.$data.optionsSelect1.push({
                    name: 'select...'
                });
            this.$data.select1 = project.length;
            window.console.log(this.$data.optionsSelect1);


            //获取文件列表
            let _this = this;
            this.$axios({
                method:'get',
                url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

            }).then((response)=>{
                _this.downloadFileList = response.data;
                for(let index = 0; index < _this.downloadFileList.length; index++){
                    _this.tableData.push({
                        key: index,
                        label: _this.downloadFileList[index].realName,
                        disabled: false
                    });
                }
                _this.$data.data = _this.tableData;

            });
        },
        methods:{
            goNextStep(){
                if(this.value.length !== 0){
                    this.$data.step=2;
                }else{
                    this.$message({
                        type:'error',
                        message:'No file selected!'
                    })
                }                            
                    
            },
            getAllFiles(val){
                let _this = this;
                let project = this.$Global.projectDetails;
                this.$axios({
                    methods:'get',
                    url:'/project/'+project.id+'/file',
                    params:{
                        subProjectType: project.subProjectList[this.select1].type,
                        dataMiningType: project.subProjectList[this.select1].dataMiningList[val].type
                    }
                }).then((response)=>{
                    window.console.log(response.data);
                    let files = [];
                    _this.downloadFileList = response.data.data;
                    for(let index = 0; index < _this.downloadFileList.length; index++){
                    files.push({
                        key: index,
                        label: _this.downloadFileList[index].realName,
                        disabled: false
                    });
                    _this.tableData = files;

                    }
                })
            },
            getSecondOptions(val){
                this.canSelect = false;
                let project = this.$Global.projectDetails.subProjectList;
                window.console.log(val);
                if(val=== this.optionsSelect1.length - 1){
                    
                    this.optionsSelect2.push({
                        name:'No Data'
                    });
                    
                    this.select2 = 0;
                    this.canSelect = true;
                }else{
                    this.optionsSelect2 = [];
                    for(let index = 0; index < project[val].dataMiningList.length; index++){
                        this.optionsSelect2.push({
                            name: project[val].dataMiningList[index].type
                        });
                    }

                    if(this.optionsSelect2.length===0){
                        this.optionsSelect2.push({
                            name:'No Data'
                        });
                        this.select2 = 0;
                        this.canSelect = true;
                    }
                }
            },
            changeChoose(current, direction, keys){
                window.console.log(current);
                window.console.log(direction);
                window.console.log(keys);
                let temp = [];
                for(let index = 0;index < current.length; index++){
                    temp.push(this.downloadFileList[current[index]])
                }
                this.chosedFileList = temp;
                window.console.log(this.chosedFileList);


            },
            startCalculatePCA(){
                let _this = this;
                let files = [];
                this.isLoading = true;
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        // workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileIdList:files,
                        parameters:{
                           k: this.parameterPCA[0].value
                        } 
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.isLoading = false;
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateICA(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.parameterICA
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateLPP(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.parameterLPP
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateNPE(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.parameterNPE
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateLLE(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.parameterLLE
                    }
                }).then((response)=>{
                    window.console.log(response);

                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
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