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
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nys: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzts: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                    </el-col>
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">nxe: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nye: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzte: </span>
                            <input style="width:100px;margin-left: 10px;" />
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
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nys: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzts: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                    </el-col>
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">nxe: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nye: </span>
                            <input style="width:100px;margin-left: 10px;" />
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">nzte: </span>
                            <input style="width:100px;margin-left: 10px;" />
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

            <div style="margin-top: 20px;">
                <span style="margin-left: 20px;">File Name </span>
                <input style="margin-left: 20px;width:100px;" />
            </div>

            <div style="margin-top:30px;">
                <el-button type="primary" @click="()=>{
                this.$message({message:'download successfully',type:'success'});
                this.$router.push('/')
                }">Download File</el-button>
                <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
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
                checkInvalid:true
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