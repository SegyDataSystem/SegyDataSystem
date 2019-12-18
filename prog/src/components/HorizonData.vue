<template>
    <div id="NewProject">
        <div class="import-title-panel">
            <span class="import-title">
                Import Horizon Data
            </span>
        </div>
        
        <div class="import-details-panel">
            <!--第一步-->
            <div class="form-item-title">
                <span class="form-item-title-span">Browse File</span>
            </div>
            <div class="form-item-body">
                <span>File:</span>
                <input type="file" style="margin-left:10px;"/>
                <div style="margin-top:10px">
                    <el-table
                        :data="tableData"
                        style="border:1px solid lightgray;height: 200px;"
                    >
                        <el-table-column
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column v-for="(item,index) in columns" :key="index" :label="item">
                            <template slot-scope="scope">
                                {{scope.row[index]}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Set data column</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">Inline: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option value="column1"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">X: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option value="column3"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">Name: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option value="column3"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">Xline: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option value="column1"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">Y: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option value="column3"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">Data: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option value="column3"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Set data output range</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Min</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Max</span>
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
                        <span>Xline</span>
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
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Work area range</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Min</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Max</span>
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
                        <span>Xline</span>
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

             <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Invalid Number process</span>
            </div>
            <div class="form-item-body">
                <el-checkbox v-model="checkInvalid">Invalid Numver</el-checkbox>
                <input style="width:100px;margin-left:10px;" :disabled="!checkInvalid" />
            </div>
            <div style="margin-top:30px;">
                <el-button type="primary" @click="()=>{this.$router.push('/')}">Import File</el-button>
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
                checkInvalid:true,
                chooseInline:'column1',
                columns:[
                    1,2,3,4,5,6,7,8,9,10,11
                ],
                tableData:[
                    [1,2,3,4,5],
                    [1,2,3,4,5]
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