<template>
    <div id="AutoSelectLabel">
        <div>
             <div class="import-title-panel">
                <span class="import-title">
                    Auto Select Label
                </span>
            </div>
            <div style="width:70%;margin-left:auto;margin-right:auto;margin-top:20px;">
                <div class="import-title-panel">
                <span class="import-title-1">
                    Select Label
                </span>
            </div>
            <div style="width:40%;margin-left:auto;margin-right:auto;margin-top:20px;text-align:left">
                <div class="form-item-body" style="margin-top:5px;">
                    <span>Get Label Type:</span>
                    <el-select v-model="chooseType" size="small" style="margin-left:30px;">
                        <el-option value="0" label="Numbers"></el-option>
                        <!-- <el-option value="0" label="Horizon Label"></el-option> -->
                    </el-select>
                </div>
                <div class="form-item-body" style="margin-top:35px;">
                    <span>Number labels of each center:</span>
                    <el-input v-model="input1" size="small" style="width:100px;margin-left:10px;" ></el-input>
                </div>
                <div class="form-item-body" style="margin-top:35px;">
                    <span>Label Name:</span>
                    <el-input v-model="input2" size="small" style="width:140px;margin-left:10px;"></el-input>
                </div>
                <div style="margin-top:10px;">
                    
                </div>

            </div>

            <div style="margin-top:50px;width:40%;margin-left:auto;margin-right:auto;text-align:left">
                    
                    <el-button type="primary" @click="()=>{this.$router.push({path:'/',query:{a:'a'}})}">Run</el-button>
            </div>

            </div>

           
        </div>
        <div style="width:100%;height:50px;"></div>

    </div>
</template>

<script>
    export default {

        data(){
            return{
                chooseType:'0',
                input1:'300',
                input2:'label_name'
            }
        },
        
        methods:{
            changeValue(val){
                if(val=='Use Percent%'){
                    this.$data.valueChange=true;
                    
                }else{
                    this.$data.valueChange=false;
                }
            }
        }
    }
</script>

<style scoped>
#AutoSelectLabel{
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