<template>
    <div id="NewProject">
        <el-dialog :visible.sync="dialogVisible" width="350px" title="Input">
            <div style="">
                <span>
                    Enter the name of new attribute
                </span>
                <div style="margin-top:5px;">
                    <el-input size="small" v-model="newAttribute">
                    </el-input>
                </div>
                <div style="margin-top:10px;">
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">OK</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
            </div>
        </el-dialog>
        <div class="import-title-panel">
            <span class="import-title">
                Calculate Attributes
            </span>
        </div>
        
        <div class="import-details-panel">
            <div class="form-item-body">
                <el-input style="width:90%;font-size:40px;" ></el-input>
            </div>
        </div>
        <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
            <el-row style="width；100%">
                <el-col style="width:30%">
                    <div class="import-title-panel">
                        <span class="import-title">
                            KeyBorad
                        </span>
                    </div>
                    <div class="form-item-body">
                        <el-row style="width:100%;text-align:left" >
                            <el-col style="width:25%">
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">(</el-button>
                                </div>
                                 <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">7</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">4</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">3</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">0</el-button>
                                </div>
                            </el-col>
                            <el-col style="width:24%">
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">)</el-button>
                                </div>
                                 <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">8</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">5</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">2</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">.</el-button>
                                </div>
                            </el-col>
                            <el-col style="width:24%">
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">C</el-button>
                                </div>
                                 <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">9</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">6</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">1</el-button>
                                </div>
                            </el-col>
                            <el-col style="width:24%">
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">(</el-button>
                                </div>
                                 <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">7</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">4</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">3</el-button>
                                </div>
                                <div style="margin-top:5px;">
                                    <el-button type="" style="width:40px;height:40px;">0</el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <div style="width:88%;margin-top:5px;text-align:center">
                            <el-button type="" style="width:100%">=</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col style="width:27%;margin-left:1%">
                    <div class="import-title-panel">
                        <span class="import-title">
                            Function
                        </span>
                    </div>
                    <div style="width:100%;text-align:center">
                        <div style="width:80%;">
                            <el-button type="" style="width:100%">Log</el-button>
                        </div>
                        <div style="width:80%;margin-top:15px;">
                            <el-button type="" style="width:100%">Max</el-button>
                        </div>
                        <div style="width:80%;margin-top:15px;">    
                            <el-button type="" style="width:100%">Min</el-button>
                        </div>
                        <div style="width:80%;margin-top:15px;">
                            <el-button type="" style="width:100%">Sqrt</el-button>
                        </div>
                        <div style="width:80%;margin-top:15px;">
                            <el-button type="" style="width:100%">Cos</el-button>
                        </div>
                        <div style="width:80%;margin-top:15px;">
                            <el-button type="" style="width:100%">Sin</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col style="width:40%;margin-left:1%">
                    <div class="import-title-panel">
                        <span class="import-title">
                            Attributes
                        </span>
                    </div>
                    <el-row style="width: 100%">
                        <el-col style="width:50%">
                            <div style="width: 90%;height:100px;">
                                <el-select v-model="select1" size="small">
                                    <el-option value="0" label="Horizon3D"></el-option>
                                </el-select>
                            </div>
                            <div style="width: 90%;height:100px;">
                                <el-select v-model="select2" size="small">
                                    <el-option value="0" label="Ha6_T03t-50"></el-option>
                                </el-select>
                            </div>
                            <div style="width: 90%;height:100px;">
                                <el-select v-model="select3" size="small">
                                    <el-option value="0" label="Preprocess"></el-option>
                                </el-select>
                            </div>
                            <div style="width: 90%;height:100px;">
                                <el-select v-model="select4" size="small">
                                    <el-option value="0" label="SRC"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col style="width:50%">
                            <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 98%;border:1px solid lightgray;font-szie:10px;"
                                max-height="330"
                                >
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column prop="name" label="Name" width="200" style="font-size:8px;">
                                </el-table-column>
                            </el-table>
                        </el-col>
                        
                    </el-row>
                </el-col>

            </el-row>

        </div>

        <div style="margin-top:30px;">
                <el-button type="primary" @click="()=>{this.$data.dialogVisible = true}">Add Attributes</el-button>
                 <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
        </div>
        <div style="width:100%;height:50px;"></div>

    </div>
</template>

<script>
    export default {
        name: "NewProject",
        data(){
            return{
                checkInvalid:true,
                chooseInline:'column1',
                select1:'0',
                select2:'0',
                select3:'0',
                select4:'0',
                tableData:[
                    {
                        name:'SRC_rms_Ha6_angle_limit_MIMC'
                    },
                    {
                        name:'SRC_rms_Ha6_angle_limit_MIMC'
                    },
                    {
                        name:'SRC_rms_Ha6_angle_limit_MIMC'
                    },
                    {
                        name:'SRC_rms_Ha6_angle_limit_MIMC'
                    },
                    {
                        name:'SRC_rms_Ha6_angle_limit_MIMC'
                    },
                    {
                        name:'SRC_rms_Ha6_angle_limit_MIMC'
                    }
                ],
                dialogVisible:false,
                newAttribute:''
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

.form-item-title{

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