<template>
  <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
    <div class="index-sales-list" :style="{ borderColor: colors }">
      <div class="index-sales-list-name">
        {{ name }}
      </div>
      <div class="index-sales-list-main" :style="{ background: colors }">
          
        <div class="index-sales-list-main-number" style="text-align: center">
          <count-to :startVal="0" :endVal="number" :duration="3000"></count-to>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import DealSvg from "../../assets/icon/deal.svg";
import MoneySvg from "../../assets/icon/money.svg";
import countTo from "vue-count-to";
export default {
  props: ["colors", "name", "number", "ionc"],
  components: {
    DealSvg,
    MoneySvg,
    countTo,
  },
};
</script>

<style scoped>
.index-sales-list {
  width: 100%;
  height: auto;
  text-align: center;
  /* border: 1px soild #FFA333; */
  border: 1px solid #ffa333;
  border-radius: 5px;
  box-sizing: border-box;
}
.index-sales-list-name {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #5c5c5c;
}
.index-sales-list-main {
  width: 100%;
  height: 60px;
  text-align: center;
  background: #ffa333;
  display: flex;
  justify-content: space-between;
}
.index-sales-list-main-icon {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index-sales-list-main-icon-svg {
  width: 100%;
  height: 35px;
  text-align: center;
  color: #ffffff;
  fill: currentColor;
}
.index-sales-list-main-number {
  width: 100%;
  /* background: chartreuse; */
  text-align: center;
  font-size: 30px;
  box-sizing: border-box;
  line-height: 60px;
  color: #ffffff;
}
</style>