<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" title="select label">
            <div>
                <span>Enter label type：</span>
                <el-input v-model="input1" size="small" class="input-use"></el-input>
            </div>
            <div style="margin-top:30px;">
                <span>Enter label type：</span>
                <el-input v-model="input2" size="small" class="input-use"></el-input>
            </div>
            <div style="margin-top:30px;">
                <el-button size="small" type="primary" @click="toNext">OK</el-button>
                <el-button size="small" type="primary" @click="dialogVisible=false">Cancel</el-button>
            </div>

        </el-dialog>
        <div>
            <el-menu  class="el-menu-demo" mode="horizontal"  :router="true">
            <el-submenu index="0">
                <template slot="title">Expand Tools</template>
                <el-menu-item @click="useSelectLabel=true">Select Label</el-menu-item>
            </el-submenu>
            </el-menu>
        </div>
        <div class="image-panel">
            <img :src="imagePath" class="image" @mousemove="touchstart" @mousedown="mousedown" />
                
<!-- 
            </div> -->

            <div style="margin-top:20px;">
                <span>x position: {{x_position}}</span> &nbsp;-&nbsp;
                <span>y position: {{y_position}}</span>
            </div>

            <div style="margin-top:30px;">
                <el-button size="small" type="primary" @click="()=>{this.$router.push('/LabelMerger')}">MergeLabel</el-button>

            </div>


        </div>
    </div>
</template>
<script>
export default {
    name:'',
    data(){
        return{
            dialogVisible: false,
            input1:'2',
            input2:'filename_label',
            x_position: 0,
            y_position: 0,
            useSelectLabel:false,
            chooseLabelX:0,
            chooseLabelY:0,
            imagePath:require('../assets/back.jpg')
        }
    },
    mounted(){
        this.$data.imagePath = this.$route.query.imagePath;
        this.downloadFileQuick(this.$route.query.id);
    },
    methods:{
        downloadFileQuick(id){
                
                window.console.log(id);
                // this.$axios({
                //     method:'get',
                //     url: this.$Global.server_config.url+'/downloadFile/'+'1213762585929601025',
                //     responseType:'blob'
                // }).then((response)=>{
                //     window.console.log(response);
                // })
                let _this = this;
                this.$axios.get(this.$Global.server_config.url+'/downloadFile/'+id,{responseType: 'arraybuffer'})
                .then((res) => {
                    return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );   
                }).then(data => {
                    _this.imagePath = data //图片地址 <img src='data' />
                })
            },
        toNext(){
            this.$Global.mergeLabels.push({
                labelName: this.$data.input2,
                x_position: this.chooseLabelX,
                y_position: this.chooseLabelY
            });

            this.$message({
                type:'success',
                message:'select success!'
            });

            this.dialogVisible=false;

        },
        touchstart(e){
            let x_position = 0;
            let y_position = 0;
            if(e.offsetX-90>0){
                x_position = e.offsetX - 90;
                if(x_position > 315){
                    x_position = 315;
                }
            }else{
                x_position = 0;
            }
            if(361 - e.offsetY -17 > 0){
                y_position = 361 - e.offsetY - 17;
                if(y_position > 333){
                    y_position = 333;
                }
            }else{
                y_position = 0;
            }


            x_position = x_position * (1180-450)/315 + 450;
            y_position = y_position * (1080-400)/333 + 400;

            this.$data.x_position = parseInt(x_position);
            this.$data.y_position = parseInt(y_position);
            // window.console.log(e.targetTouches[0].clientY);
        },
        mousedown(e){
            window.console.log(e);
            if(this.$data.useSelectLabel){
                this.$data.dialogVisible=true;
                this.$data.chooseLabelX = this.$data.x_position;
                this.$data.chooseLabelY = this.$data.y_position;
            }
        }
    }
}
</script>
<style scoped>
.input-use{
    width: 150px;
    margin-left: 13px;
}

.image-panel{
    width: 800px;
    /* margin-left:auto;
    margin-right:auto; */
}


.image{
    width:500px;
    height:400px;
    /* background-image: url('../assets/back.jpg'); */
    /* background-size: cover; */
    /* background-color:red;  */
    margin-left:200px;
    /* margin-right:auto; */
    margin-top:30px;
}
</style>