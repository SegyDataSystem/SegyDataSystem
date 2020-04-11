<template>
    <div id="LabelMerger">           
        <div>
             <div class="import-title-panel">
                <span class="import-title">
                    Label Merger
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                
                <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;text-align:left">
                    <div class="form-item-body" style="margin-top:5px;">
                        <span>Select Type:</span>
                        <el-select v-model="chooseType" size="small" style="margin-left:30px;">
                            <el-option value="0" label="Horizon label"></el-option>
                        </el-select>
                        <el-select v-model="chooseType1" size="small" style="margin-left:30px;">
                            <el-option value="0" label="Ha6_T03t-50"></el-option>
                        </el-select>
                    </div>
                    
                    <div style="margin-top:40px;">
                        <el-transfer v-model="value" :data="tableData" @change="changeChoose" :titles="['file uploaded', 'file chosen']"></el-transfer>
                    </div>

                    <div class="form-item-body" style="margin-top:5px;">
                        <span>file: </span>
                        <el-input size="small" v-model="fileName" style="width:160px;"></el-input>
                        
                    </div>

                </div>

                <div style="margin-top:50px;width:40%;margin-left:auto;margin-right:auto;text-align:left">
                        
                    <el-button type="primary" @click="mergeLabel">Merge</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push({path:'/',query:{a:'a'}})}">Cancel</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push({path:'/',query:{a:'a'}})}">Display</el-button>
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
            const generateData = _ => {
            const data = [];
            window.console.log(_);
            
                data.push({
                    key: 1000,
                    label: 'SRC_dn_rms_poststackamplitude',
                    disabled: false
                });
                
                return data;
            };
            return{
                tableData: generateData(),
                value: [],
                chooseType:'0',
                input1:'300',
                input2:'label_name',
                chooseType1:'0',
                chosedFileList:[],
                downloadFileList:[],
                fileName:''
            }
        },

        mounted(){
            //获取文件列表
            let _this = this;
            // this.$data.fileName = this.$route.query.name;
            let labelList = this.$Global.mergeLabels;
            this.$data.tableData = [];
            for(let index = 0; index < labelList.length; index++){
                    _this.tableData.push({
                        key: index,
                        label: labelList[index].labelName,
                        disabled: false
                    });
            }

            this.$data.downloadFileList = labelList;


            // this.$axios({
            //     method:'get',
            //     url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

            // }).then((response)=>{
            //     _this.downloadFileList = response.data;
            

            // });
        },
        
        methods:{
            changeValue(val){
                if(val=='Use Percent%'){
                    this.$data.valueChange=true;
                    
                }else{
                    this.$data.valueChange=false;
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
            mergeLabel(){
                
                if(this.$data.value.length===0){
                    this.$message({
                        type:'error',
                        message:'no label chosed!'
                    })
                }else{
                    this.$data.value = [];
                    
                    this.$data.tableData.push({
                        key: this.$data.tableData.length,
                        label: this.$data.fileName,
                        disabled: false
                    });
                    this.$message({
                        type:'success',
                        message:'merge success!'
                    })
                }
                // for(let index = 0; index< this.$data.value.length; index++){
                //     this.$data.tableData.push(this.$data.value[index]);
                // }
                // window.console.log(this.$data.tableData);
                

                // this.$data.chosedFileList = [];

               
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

    .import-title-1{
        font-size: 22px;
        
    }
</style>