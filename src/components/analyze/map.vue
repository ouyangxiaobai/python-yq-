<template>
  <div class="index-pay">
    <div class="index-pay-box">
      <span class="index-pay-box-name">疫情分布</span>
      <div id="index-pay-box-charts">
        <div id="myChartChina" style="width: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../node_modules/axios";

export default {
  data() {
    return {
      mapdata: null,
    };
  },

  mounted() {
    this.getdata();
  },

  methods: {
    getdata() {
      axios
        .get("http://127.0.0.1:8991/get_map_data")
        .then(
          (response) => (
            console.log(response.data.result),
            (this.mapdata = response.data.result),
            this.drawLine()
          )
        );
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChina");
      var resizeMyChartContainer = function () {
        myChartContainer.style.width = document.body.offsetWidth / 2 + "px";
      };
      resizeMyChartContainer();
      var myChartChina = this.$echarts.init(myChartContainer);

      // 绘制图表
      var optionMap = {
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: [""],
        },
        visualMap: {
          min: 0,
          max: 5000,
          left: "10%",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          color: ["#ff3300", "#ffffff"],
        },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)",
              },
              emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            data: this.mapdata,
          },
        ],
      };

      myChartChina.setOption(optionMap);
      window.onresize = function () {
        resizeMyChartContainer();
        myChartChina.resize();
      };
    },
  },
};
</script>

<style scoped>
.index-pay {
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
}
.index-pay-box {
  width: 100%;
  /* height: 200px; */
  border: 1px solid #e6e6e6;
  position: relative;
  padding: 20px 15px;
  box-sizing: border-box;
}
.index-pay-box-name {
  position: absolute;
  width: 100px;
  height: 30px;
  background: #ffffff;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  color: #000000;
  left: 25px;
  top: -15px;
}
.index-pay-box-select {
  width: 100%;
  height: 40px;
  /* background: burlywood; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}
#index-pay-box-charts {
  width: 100%;
  height: 500px;
  /* background: chocolate; */
}
</style>