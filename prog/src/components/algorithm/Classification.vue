<template>
    <div id="NewProject">
        <div class="import-title-panel">
            <span v-if="step<=2" class="import-title">
                Classification Step {{step}} of 2
            </span>
            <span v-if="step>2" class="import-title">
                {{select5}}
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
                    <el-transfer v-model="value" @change="changeChoose" :data="tableData" :titles="[' ', ' ']"></el-transfer>
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
                    <span class="form-item-title-span">Classification Method</span>
                </div>
                <div class="form-item-body">
                    <el-select v-model="select5" placeholder="select...">
                        <el-option value="BAYES" label="BAYES"></el-option>
                        <el-option value="SVM" label="SVM"></el-option>
                        <el-option value="CART" label="CART"></el-option>
                        <el-option value="RandomForest" label="Random Forest"></el-option>
                        <el-option value="CoTrade" label="CoTrade"></el-option>
                        <el-option value="UDEED" label="UDEED"></el-option>
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
                        <input style="width:100px;" v-model="workZone.xlineTo"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineStep"/>
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
                    }">Finish</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
            </div>

            <div v-if="step===3">
                <div v-if="select5==='BAYES'">
                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">Paramters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Well Label Path:</span>
                            <input style="width:100px;" v-model="parameterBAYES[0].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Discriminant Function:</span>
                            <el-select v-model="parameterBAYES[1].value">
                                <el-option value="0" label="Diaglinear"></el-option>
                                <el-option value="0" label="Diagquadratic"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:20px;">
                            <el-button type="primary">Instruction</el-button>
                        </div>
                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Train Result</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Misclassification Rate:</span>
                            <input style="width:100px;" v-model="parameterBAYES[2].value" />
                        </div>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="()=>{
                           this.$router.push('/');
                        }">Run</el-button>
                        <el-button  @click="startCalculateBAYES">Train</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='SVM'">
                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">Paramters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Well Label Path:</span>
                            <input style="width:100px;" v-model="parameterSVM[0].value" />
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="display:inline-block;width:200px;">Cost:</span>
                            <input style="width:100px;" v-model="parameterSVM[1].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Discriminant Function:</span>
                            <el-select v-model="parameterSVM[2].value">
                                <el-option value="0" label="Diaglinear"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top: 20px;">
                            <span style="display:inline-block;width:200px;">Gama:</span>
                            <input style="width:100px;" v-model="parameterSVM[3].value" />
                        </div>
                        <div style="margin-top: 20px;">
                            <el-checkbox label="Default Parameter" v-model="parameterSVM[4].value">Default Parameter</el-checkbox>
                        </div>

                        <div style="margin-top:20px;">
                            <el-button type="primary">Instruction</el-button>
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Train Result</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Misclassification Rate:</span>
                            <input style="width:100px;" v-model="parameterSVM[5].value" />
                        </div>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="()=>{
                           this.$router.push('/');
                        }">Run</el-button>
                        <el-button  @click="startCalculateSVM">Train</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='CART'">
                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">Paramters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Well Label Path:</span>
                            <input style="width:100px;" v-model="parameterCART[0].value" />
                        </div>

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Min Parent:</span>
                            <input style="width:100px;" v-model="parameterCART[1].value" />
                        </div>

                        <div style="margin-top:20px;">
                            <el-button type="primary">Instruction</el-button>
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Train Result</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Misclassification Rate:</span>
                            <input style="width:100px;" v-model="parameterCART[2].value" />
                        </div>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="()=>{
                           this.$router.push('/');
                        }">Run</el-button>
                        <el-button  @click="startCalculateCART">Train</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='Random Forest'">
                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">Paramters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Well Label Path:</span>
                            <input style="width:100px;" v-model="parameterRandomForest[0].value" />
                        </div>

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Tree Number:</span>
                            <input style="width:100px;" v-model="parameterRandomForest[1].value" />
                        </div>
                        <div style="margin-top:20px;">
                            <el-button type="primary">Instruction</el-button>
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Train Result</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Out-of-bag Error:</span>
                            <input style="width:100px;" v-model="parameterRandomForest[2].value" />
                        </div>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="()=>{
                           this.$router.push('/');
                        }">Run</el-button>
                        <el-button  @click="startCalculateRandomForest">Train</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='CoTrade'">
                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">Paramters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Well Label Path:</span>
                            <input style="width:100px;" v-model="parameterCoTrade[0].value" />
                        </div>

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Base Classifier:</span>
                            <el-select v-model="parameterCoTrade[1].value">
                                <el-option value="NB" label="NB"></el-option>
                            </el-select>
                        </div>

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Max Iterations:</span>
                            <input style="width:100px;" v-model="parameterCoTrade[2].value" />
                        </div>


                        <div style="margin-top:20px;">
                            <el-button type="primary">Instruction</el-button>
                        </div>
                    </div>



                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Train Result</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">AUC:</span>
                            <input style="width:100px;" v-model="parameterCoTrade[3].value" />
                        </div>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="()=>{
                           this.$router.push('/');
                        }">Run</el-button>
                        <el-button  @click="startCalculateCoTrade">Train</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>
                <div v-if="select5==='UDEED'">
                    <div class="form-item-title" style="margin-top:40px;">
                        <span class="form-item-title-span">Paramters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">Well Label Path:</span>
                            <input style="width:100px;" v-model="parameterUDEED[0].value" />
                        </div>

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Base Classify Num:</span>
                            <input style="width:100px;" v-model="parameterUDEED[1].value" />
                        </div>

                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:200px;">Balancing Parameter:</span>
                            <input style="width:100px;" v-model="parameterUDEED[2].value" />
                        </div>

                        <div style="margin-top:20px;">
                            <el-button type="primary">Instruction</el-button>
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Train Result</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:200px;">AUC:</span>
                            <input style="width:100px;" v-model="parameterUDEED[3].value" />
                        </div>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="()=>{
                           this.$router.push('/');
                        }">Run</el-button>
                        <el-button  @click="startCalculateUDEED">Train</el-button>
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
            
               
                
                return data;
            };
            return{
                optionsSelect1:[

                ],
                optionsSelect2:[

                ],
                chooseFloat:'IBM',
                checkInvalid:true,
                select1:5,
                select2:'',
                select3:'0',
                select4:'0',
                select5:'BAYES',
                select6:'0',
                data: generateData(),
                value: [],
                step:1,
                tableData:[
                ],
                workZone:{
                    id:'',
                    inlineFrom:0,
                    inlineTo:0,
                    inlineStep:0,
                    xlineFrom:0,
                    xlineTo:0,
                    xlineStep:0,
                    timeFrom:0,
                    timeStep:0,
                },
                downloadFileList:[],
                chosedFileList:[],
                parameterUDEED:[
                    {
                        name:'Well Label Path',
                        value:''
                    },
                    {
                        name:'Base Classify Num',
                        value: ''
                    },
                    {
                        name:'Balancing Parameter',
                        value:''
                    },
                    {
                        name:'AUC',
                        value:''
                    }
                ],
                parameterCoTrade:[
                    {
                        name:'Well Label Path',
                        value:''
                    },
                    {
                        name:'Base Classifier',
                        value: ''
                    },
                    {
                        name:'Max Iterations',
                        value:''
                    },
                    {
                        name:'AUC',
                        value:''
                    }
                ],
                parameterRandomForest:[
                    {
                        name:'Well Label Path',
                        value:''
                    },
                    {
                        name:'Tree Number',
                        value: ''
                    },

                    {
                        name:'Out-of-bag Error',
                        value:''
                    }
                ],
                parameterCART:[
                    {
                        name:'Well Label Path',
                        value:''
                    },
                    {
                        name:'Min Parent',
                        value: ''
                    },

                    {
                        name:'Misclassification Rate',
                        value:''
                    }
                ],
                parameterSVM:[
                    {
                        name:'Well Label Path',
                        value:''
                    },
                    {
                        name:'Cost',
                        value:''
                    },
                    {
                        name:'kernel Type',
                        value: ''
                    },
                    {
                        name:'Gama',
                        value:''
                    },
                    {
                        name:'Default Parameter',
                        value:''
                    },

                    {
                        name:'Misclassification Rate',
                        value:''
                    }
                ],
                parameterBAYES:[
                    {
                        name:'Well Label Path',
                        value:''
                    },
                    {
                        name:'Discriminant Function',
                        value: ''
                    },

                    {
                        name:'Misclassification Rate',
                        value:''
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
            startCalculateBAYES(){
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
                        parameters: this.parameterBAYES
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
            startCalculateSVM(){
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
                        parameters: this.parameterSVM
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
            startCalculateCART(){
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
                        parameters: this.parameterCART
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
            startCalculateRandomForest(){
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
                        parameters: this.parameterRandomForest
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
            startCalculateCoTrade(){
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
                        parameters: this.parameterCoTrade
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
            startCalculateUDEED(){
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
                        parameters: this.parameterUDEED
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