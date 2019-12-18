<template>
    <div id="NewProject">
        <div class="import-title-panel">
            <span v-if="step<=2" class="import-title">
                Classification Step {{step}} of 2
            </span>
            <span v-if="step>2" class="import-title">
                BAYES
            </span>
        </div>

        <div class="import-details-panel">
            <div v-if="step===1">
                <div class="form-item-title">
                    <span class="form-item-title-span">Data Selection</span>
                </div>
                <div class="form-item-body">
                    <el-select v-model="select1" placeholder="select...">
                        <el-option value="0" label="Seismic3D"></el-option>
                    </el-select>
                    <el-select v-model="select2" placeholder="select...">
                        <el-option value="0" label="Poststack Amplitude"></el-option>
                    </el-select>
                    <el-select v-model="select3" placeholder="select...">
                        <el-option value="0" label="Preprocess"></el-option>
                    </el-select>
                    <el-select v-model="select4" placeholder="select...">
                        <el-option value="0" label="SRC"></el-option>
                    </el-select>
                </div>
                <div class="form-item-body">
                    <el-transfer v-model="value" :data="data" :titles="[' ', ' ']"></el-transfer>
                </div>
                <div class="form-item-body">
                    <el-button type="primary">Show Correlation Diagram</el-button>
                    <el-button type="primary">Show Histogram</el-button>
                </div>
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="()=>{
                        this.$data.step=2;
                    }">Next</el-button>
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
                        <el-option value="0" label="BAYES"></el-option>
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
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Crossline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
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
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Crossline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" />
                    </el-col>
                </el-row>
                </div>
                
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="()=>{()=>{this.$data.step=1;}}">back</el-button>
                    <el-button  @click="()=>{
                        this.$data.step=3;
                    }">Finish</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
            </div>

            <div v-if="step===3">

                <div class="form-item-title" style="margin-top:40px;">
                    <span class="form-item-title-span">Paramters</span>
                </div>
                <div class="form-item-body">
                    <div>
                        <span style="display:inline-block;width:200px;">Well Label Path:</span>
                        <input style="width:100px;" />
                    </div>
                    <div style="margin-top:15px;">
                        <span style="display:inline-block;width:200px;">Discriminant Function:</span>
                        <el-select v-model="select6">
                            <el-option value="0" label="Diaglinear"></el-option>
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
                        <input style="width:100px;" />
                    </div>
                </div>

                
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="()=>{
                       this.$router.push('/');
                    }">Run</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Train</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
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
                chooseFloat:'IBM',
                checkInvalid:true,
                select1:'0',
                select2:'0',
                select3:'0',
                select4:'0',
                select5:'0',
                select6:'0',
                data: generateData(),
                value: [],
                step:1,
                tableData:[
                    {
                        name:'SRC_dn_rms_poststackamplitude'
                    }
                ]
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