<template>
    <div id="NewProject">
        <div class="import-title-panel">
            <span class="import-title">
                Export Segy
            </span>
        </div>

        <div class="import-details-panel">
            <!--第一步-->
            <div class="form-item-title">
                <span class="form-item-title-span">Floating-point Format</span>
            </div>
            <div class="form-item-body">
                <el-radio label="IBM" value="IBM" v-model="chooseFloat"></el-radio>
                <el-radio label="IEEE" value="IEEE" v-model="chooseFloat"></el-radio>
            </div>
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">dataset size</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">nxs: </span>
                            <input v-model="workzone.inlineFrom" disabled style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nys: </span>
                            <input v-model="workzone.xlineFrom" disabled style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzts: </span>
                            <input v-model="workzone.timeFrom" disabled style="width:100px;margin-left: 10px;" />
                        </div>
                    </el-col>
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">nxe: </span>
                            <input v-model="workzone.inlineTo" disabled style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nye: </span>
                            <input v-model="workzone.xlineTo" disabled style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzte: </span>
                            <input v-model="workzone.timeTo" disabled style="width:100px;margin-left: 10px;" />
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">export size</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">nxs: </span>
                            <input v-model="workzoneOutput.inlineFrom" style="width:100px;margin-left: 10px;" />
                        </div>
                        <div v-show="workzoneOutputFlag.inlineFrom">
                            <span class="validation">value invalid!</span>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nys: </span>
                            <input v-model="workzoneOutput.xlineFrom" style="width:100px;margin-left: 10px;" />
                        </div>
                        <div v-show="workzoneOutputFlag.xlineFrom">
                            <span class="validation">value invalid!</span>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzts: </span>
                            <input v-model="workzoneOutput.timeFrom" style="width:100px;margin-left: 10px;" />
                        </div>
                        <div v-show="workzoneOutputFlag.timeFrom">
                            <span class="validation">value invalid!</span>
                        </div>
                    </el-col>
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">nxe: </span>
                            <input v-model="workzoneOutput.inlineTo" style="width:100px;margin-left: 10px;" />
                        </div>
                        <div v-show="workzoneOutputFlag.inlineTo">
                            <span class="validation">value invalid!</span>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nye: </span>
                            <input v-model="workzoneOutput.xlineTo" style="width:100px;margin-left: 10px;" />
                        </div>
                        <div v-show="workzoneOutputFlag.xlineTo">
                            <span class="validation">value invalid!</span>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzte: </span>
                            <input v-model="workzoneOutput.timeTo" style="width:100px;margin-left: 10px;" />
                        </div>
                        <div v-show="workzoneOutputFlag.timeTo">
                            <span class="validation">value invalid!</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div style="width: 100%;margin-left: auto;margin-right: auto;height: 1px;background-color: lightgray;margin-top: 20px;margin-bottom: 20px;"></div>

            <div style="margin-top: 20px;">
                <el-checkbox value="Set a specific value to invalid number" v-model="checkInvalid"></el-checkbox>
                <span style="margin-left: 20px;">Invalid </span>
                <input style="margin-left: 20px;width:100px;" :disabled="!checkInvalid" />
            </div>

            

            <div style="margin-top:30px;">
                <el-button 
                    size="small"
                    type="primary" 
                    @click="exportSeismic">Export</el-button>
                <el-button size="small" type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
            </div>
            <div style="width:100%;height:50px;"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "NewProject",
        data(){
            return{
                chooseFloat:'IBM',
                checkInvalid:true,
                fileName:'',
                workzone:{
                    inlineFrom:'',
                    inlinTo:'',
                    inlinStep:'',
                    xlineFrom:'',
                    xlineTo:'',
                    xlineStep:'',
                    timeFrom:'',
                    timeTo:'',
                    timeStep:''
                },
                workzoneOutput:{
                    inlineFrom:470,
                    inlineTo:1070,
                    inlinStep:1,
                    xlineFrom:480,
                    xlineTo:1180,
                    xlineStep:1,
                    timeFrom:2500,
                    timeTo:3100,
                    timeStep:2
                },
                workzoneOutputFlag:{
                    inlineFrom:false,
                    inlineTo:false,
                    inlinStep:false,
                    xlineFrom:false,
                    xlineTo:false,
                    xlineStep:false,
                    timeFrom:false,
                    timeTo:false,
                    timeStep:false
                }
            }
        },
        mounted(){
            this.workzone = this.$Global.projectDetails.workZone;
        },
        watch:{
            workzoneOutput:{
                handler(val, oldVal){
                    window.console.log(val);
                    window.console.log(oldVal);
                    let form = this.$data.workzoneOutput;
                    let workzone = this.$data.workzone;
                    for(var obj in form){
                        if(form[obj]){
                            form[obj] = parseInt(form[obj]);
                        }else{
                            form[obj] = '';
                        }
                    }

                    if(form.inlineFrom < workzone.inlineFrom || form.inlineFrom > workzone.inlineTo || form.inlineFrom > form.inlineTo){
                        this.$data.workzoneOutputFlag.inlineFrom = true;
                        
                    }else{
                        this.$data.workzoneOutputFlag.inlineFrom = false;
                    }

                    if(form.inlineTo > workzone.inlineTo || form.inlineTo < workzone.inlineFrom || form.inlineTo < form.inlineFrom){
                        this.$data.workzoneOutputFlag.inlineTo = true;
                        
                    }else{
                        this.$data.workzoneOutputFlag.inlineTo = false;
                    }


                    if(form.xlineFrom < workzone.xlineFrom || form.xlineFrom > workzone.xlineTo || form.xlineFrom > form.xlineTo){
                        this.$data.workzoneOutputFlag.xlineFrom = true;
                        
                    }else{
                        this.$data.workzoneOutputFlag.xlineFrom = false;
                    }

                    if(form.xlineTo > workzone.xlineTo || form.xlineTo < workzone.xlineFrom || form.xlineTo < form.xlineFrom){
                        this.$data.workzoneOutputFlag.xlineTo = true;
                        
                    }else{
                        this.$data.workzoneOutputFlag.xlineTo = false;
                    }


                    if(form.timeFrom > workzone.timeTo || form.timeFrom < workzone.timeFrom || form.timeFrom > form.timeTo){
                        this.$data.workzoneOutputFlag.timeFrom = true;
                        
                    }else{
                        this.$data.workzoneOutputFlag.timeFrom = false;
                    }

                    if(form.timeTo < workzone.timeTo || form.timeTo > workzone.timeTo || form.timeTo < form.timeFrom){
                        this.$data.workzoneOutputFlag.timeTo = true;
                        
                    }else{
                        this.$data.workzoneOutputFlag.timeTo = false;
                    }

                },
                deep:true
            }
        },
        methods:{
            exportSeismic(){
                if(this.fileName===''){
                    this.$message({message:'Please fill ths fileName',type:'error'});
                }else{
                    let form = this.$data.workzoneOutput;
                    let workzone = this.$data.workzone;
                    let flag = true;

                    for(var obj in form){
                        if(form[obj]){
                            form[obj] = parseInt(form[obj]);
                        }else{
                            form[obj] = '';
                        }
                    }

                    if(form.inlineFrom < workzone.inlineFrom || form.inlineFrom > workzone.inlineTo || form.inlineFrom > form.inlineTo){
                        this.$data.workzoneOutputFlag.inlineFrom = true;
                        flag = false;
                    }else{
                        this.$data.workzoneOutputFlag.inlineFrom = false;
                    }

                    if(form.inlineTo > workzone.inlineTo || form.inlineTo < workzone.inlineFrom || form.inlineTo < form.inlineFrom){
                        this.$data.workzoneOutputFlag.inlineTo = true;
                        flag = false;
                    }else{
                        this.$data.workzoneOutputFlag.inlineTo = false;
                    }

                    

                    if(form.xlineFrom < workzone.xlineFrom || form.xlineFrom > workzone.xlineTo || form.xlineFrom > form.xlineTo){
                        this.$data.workzoneOutputFlag.xlineFrom = true;
                        flag = false;
                    }else{
                        this.$data.workzoneOutputFlag.xlineFrom = false;
                    }

                    if(form.xlineTo > workzone.xlineTo || form.xlineTo < workzone.xlineFrom || form.xlineTo < form.xlineFrom){
                        this.$data.workzoneOutputFlag.xlineTo = true;
                        flag = false;
                    }else{
                        this.$data.workzoneOutputFlag.xlineTo = false;
                    }


                    if(form.timeFrom > workzone.timeTo || form.timeFrom < workzone.timeFrom || form.timeFrom > form.timeTo){
                        this.$data.workzoneOutputFlag.timeFrom = true;
                        flag = false;
                    }else{
                        this.$data.workzoneOutputFlag.timeFrom = false;
                    }

                    if(form.timeTo < workzone.timeFrom || form.timeTo > workzone.timeTo || form.timeTo < form.timeFrom){
                        this.$data.workzoneOutputFlag.timeTo = true;
                        flag = false;
                    }else{
                        this.$data.workzoneOutputFlag.timeTo = false;
                    }



                    if(flag){

                        let _this = this;
                        this.$axios({
                            method:'post',
                            url:'/segy/export',
                            params:{
                                fileId: this.$Global.projectDetails.subProjectList[0].file.id,
                                userId: '10000'
                            },
                            data:this.workzoneOutput
                        }).then((response)=>{
                            if(response.data.code===0){
                                _this.$message({message:'Export successfully',type:'success'});
                                _this.$router.push('/')
                            }
                        })
                    }
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

    .validation{
        font-size: 12px;
        color: red;
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