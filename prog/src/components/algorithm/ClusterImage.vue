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

        <el-dialog :visible.sync="dialogVisibleColor" title="Change Colors">
            <div>
                <span>Change Colors：</span>
                <el-select size="small" v-model="choosedColors">
                    <el-option label="color group 1" :value="0"></el-option>
                    <el-option label="color group 2" :value="1"></el-option>
                    <el-option label="color group 3" :value="2"></el-option>
                </el-select>
            </div>
            <div style="margin-top:30px;">
                <el-button size="small" type="primary" @click="useChangedColors">OK</el-button>
                <el-button size="small" type="primary" @click="dialogVisibleColor=false">Cancel</el-button>
            </div>

        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleLabel" title="Change X/Y Label">
            <div>
                <span>X Label：</span>
                <el-input v-model="modify_x" size="small" class="input-use"></el-input>
            </div>
            <div style="margin-top:30px;">
                <span>Y Label：</span>
                <el-input v-model="modify_y" size="small" class="input-use"></el-input>
            </div>
            <div style="margin-top:30px;">
                <el-button size="small" type="primary" @click="useNewLabels">OK</el-button>
                <el-button size="small" type="primary" @click="dialogVisibleLabel=false">Cancel</el-button>
            </div>

        </el-dialog>
        <div>
            <el-menu  class="el-menu-demo" mode="horizontal"  :router="true">
                <el-submenu index="0">
                    <template slot="title">Expand Tools</template>
                    <el-menu-item @click="useSelectLabel=true">Select Label</el-menu-item>
                    <el-menu-item @click="dialogVisibleColor=true">Change Colors</el-menu-item>
                    <el-menu-item @click="dialogVisibleLabel=true">Change X/Y Label</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="image-panel">
            <div class="image" id="myChartHot" @mousedown="mousedown" @mousemove="touchstart"></div>
            <!-- <img :src="imagePath" class="image" @mousemove="touchstart" @mousedown="mousedown" /> -->
            <div style="position:relative;top:-35px;">{{xlabel}}</div>
            <div style="position:relative;top:-240px;left:-220px;">{{ylabel}}</div>
            <div style="margin-top:30px;">
                <el-button size="small" type="primary" @click="()=>{this.$router.push('/LabelMerger')}">MergeLabel</el-button>

            </div>
            <div style="width:100%;height:50px;"></div>


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
            imagePath:require('../../assets/back.jpg'),
            cluster_data:[],
            useData:[],
            modify_x:'',
            modify_y:'',
            xlabel:'x_label',
            ylabel:'y_label',
            dialogVisibleColor:false,
            dialogVisibleLabel:false,
            choosedColors:0,
            colors:[
                ['#313695', '#4575b4', '#abd9e9', '#ffffbf', '#fdae61', '#f46d43',  '#a50026'],
                ['#313695', '#74add1', '#e0f3f8', '#fee090', '#d73027'],
                ['#FFB6C1', '#6495ED', '#00FF00', '#FFD700', '#FF6347']

            ]
        }
    },
    mounted(){
        // this.$data.imagePath = this.$route.query.imagePath;
        // this.downloadFileQuick(this.$route.query.id);
        let _this = this;
        this.$axios({
            method:'get',
            url:'/visual/'+this.$route.query.id
        }).then((response)=>{
            window.console.log(response.data);
            let data = JSON.parse(response.data.data);
            _this.$data.useData = data;
            window.console.log(data);
            _this.changeDraw();
        })
    },
    methods:{
        useNewLabels(){
            this.xlabel = this.modify_x;
            this.ylabel = this.modify_y;
            this.$message({
                type:'success',
                message:'change labels success'
            });
            this.dialogVisibleLabel=false;
            
        },
        useChangedColors(){
            let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
            myChartHot.dispose();
            this.$message({
                type:'success',
                message:'change color success'
            });
            this.dialogVisibleColor=false;
            this.changeDraw();
        },
        changeDraw(){
            let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
            

            let data = [];
            
            let xlimit = 700;  //480 - 1180
            let ylimit = 600;  //480 - 1080

            let xdata = [];
            let ydata = [];

                for(let x = 470; x<1170; x++){
                    xdata.push(x);
                }

                for(let y = 480; y<1080; y++){
                    ydata.push(y);
                }

                // let index = 0;
                for(let y = 0; y < ylimit; y++){
                    for(let x = 0; x < xlimit; x++){
                        data.push([x , y , this.$data.useData[x + y * 600 ]]);
                    }
                }


                let option = {
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: xdata,
                        label: this.xlabel
                    },
                    yAxis: {
                        type: 'category',
                        data: ydata,
                        label: this.ylabel
                    },
                    visualMap: {
                        min: 0,
                        max: 5,
                        calculable: true,
                        realtime: false,
                        inRange: {
                            color: this.colors[this.choosedColors]
                        }
                    },
                    grid:{
                      x:100,
                      y:30,
                      x2: 50,
                      y2:70
                     },
                    series: [{
                        name: 'Cluster',
                        type: 'heatmap',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                borderColor: '#333',
                                borderWidth: 1
                            }
                        },
                        progressive: 1000,
                        animation: false
                    }]
                };
                myChartHot.setOption(option);
        },
        // downloadFileQuick(id){
                
        //         window.console.log(id);
        //         // this.$axios({
        //         //     method:'get',
        //         //     url: this.$Global.server_config.url+'/downloadFile/'+'1213762585929601025',
        //         //     responseType:'blob'
        //         // }).then((response)=>{
        //         //     window.console.log(response);
        //         // })
        //         let _this = this;
        //         this.$axios.get(this.$Global.server_config.url+'/downloadFile/'+id,{responseType: 'arraybuffer'})
        //         .then((res) => {
        //             return 'data:image/png;base64,' + btoa(
        //         new Uint8Array(res.data)
        //           .reduce((data, byte) => data + String.fromCharCode(byte), '')
        //         );   
        //         }).then(data => {
        //             _this.imagePath = data //图片地址 <img src='data' />
        //         })
        //     },
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
    width:600px;
    height:400px;

    /* background-image: url('../assets/back.jpg'); */
    /* background-size: cover; */
    /* background-color:red;  */
    margin-left:200px;
    /* margin-right:auto; */
    margin-top:30px;
}
</style>