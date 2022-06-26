<template>
  <div class="index">
    <!-- 新闻动态循环展示 -->
    <div class="index-centent">
      <el-row :gutter="20">
        <div class="grid-content">
          <div class="index-centent-title">
            <div class="index-centent-title-left">
              <dynamic class="index-centent-title-left-icontwo" />
              新闻动态
            </div>
          </div>
          <div
            style="
              height: 110px;
              overflow: hidden;
              padding: 0 30px;
              font-size: 14px;
              line-height: 2;
            "
          >
            <p v-for="item in NewsList.result" :key="item.id">
              <!-- <i
                style="font-size: 14px; color: red; padding: 0px 10px"
                class="el-icon-info"
              ></i> -->
              <span style="color: grey; padding: 0px 13px"
                >{{ item.eventtime }}
              </span>
              <a :href="item.eventUrl">{{ item.eventdescription }} </a>
              <span style="padding: 0px 13px"> -- {{ item.sitename }}</span>
            </p>
          </div>
        </div>
      </el-row>
    </div>
    <!-- 国内疫情数据统计 -->
    <div class="index-sales">
      <div class="index-sales-box">
        <span class="index-sales-box-name">国内疫情数据统计</span>
        <el-row :gutter="20">
          <div
            v-for="(item, index) in info.result[0]"
            :key="item"
            class="text item"
          >
            <Cards
              colors="#FFA333"
              :name="index"
              :number="item"
              ionc="DealSvg"
            />
          </div>
        </el-row>
      </div>
    </div>

    <!-- 疫情分布 -->
    <el-row class="text-center" :gutter="20">
      <el-col style="margin-bottom: 20px">
        <Map />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from "@/utils/auth";
import sort from "@/assets/icon/sort.svg";
import dynamic from "@/assets/icon/dynamic.svg";
import group from "@/assets/icon/group.svg";
import Cards from "../../components/analyze/cards";
import Map from "../../components/analyze/map";
import axios from "../../../node_modules/axios";
export default {
  data() {
    return {
      userdata: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      info: null,
      NewsList: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8991/get_countryinfo_sum")
      .then(
        (response) => (console.log(response.data), (this.info = response.data))
      );
    this.userdata = getToken();
    this.getNews();
  },
  methods: {
    // 滚动栏滚动
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.NewsList.push(this.NewsList[0]);
        this.NewsList.shift();
        this.animate = false;
      }, 500);
    },
    getNews() {
      let data = {
        page: 1,
        page_size: 5,
      };
      this.loading = true;
      axios
        .get("http://127.0.0.1:8991/get_news_data")
        .then((res) => (console.log(res.data), (this.NewsList = res.data)));
    },
  },
  components: {
    sort,
    dynamic,
    group,
    Cards,
    Map,
  },
};
</script>

<style scoped>
.index {
  width: 100%;
  min-height: 100%;
}
.index-head {
  width: 100%;
  /* height: 133px; */
  padding: 16px 32px 0 32px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid #dcdfe6;
}

.index-sales {
  width: 100%;
  height: auto;
  padding: 20px 15px;
  box-sizing: border-box;
  /* background: brown; */
  /* border:  1px solid #E6E6E6; */
  border-radius: 5px;
  background: #ffffff;
  margin-bottom: 20px;
}
.index-sales-box {
  border: 1px solid #e6e6e6;
  width: 100%;
  height: auto;
  position: relative;
  padding: 25px 15px 5px;
  box-sizing: border-box;
}
.index-sales-box-name {
  position: absolute;
  width: 130px;
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

.index-head-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #292929;
  margin-bottom: 16px;
}
.index-head-centent-left {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.index-head-centent-left-text {
  height: 56px;
}
.index-head-centent-left-text p:nth-child(1) {
  margin-bottom: 7px;
  font-size: 20px;
  color: #292929;
  letter-spacing: 0.1em;
}
.index-head-centent-left-text p:nth-child(2) {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0.1em;
}
.index-head-centent-right {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.index-head-centent-right-list {
  height: 56px;
  cursor: pointer;
  margin-left: 20px;
}
.index-head-centent-right-list-icon {
  font-size: 14px;
  display: flex;
  margin-bottom: 5px;
  color: #808695;
}
.index-head-centent-right-list-icon-is {
  width: 14px;
  height: 14px;
  fill: currentColor;
  margin-right: 5px;
  padding: 5px;
  border-radius: 12px;
}

.index-head-centent-right-list-text {
  height: 28px;
  line-height: 28px;
  font-weight: bold;
  text-align: right;
  font-size: 20px;
}
.index-centent {
  width: 100%;
  min-height: 100%;
  padding: 25px;
  box-sizing: border-box;
}

.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #ffffff;
  width: 100%;
}
.index-centent-title {
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 15px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 14px;
}
.index-centent-title-left {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  /* border-radius: 11px;
    overflow: hidden; */
}
.index-centent-title-left-icon {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #1890ff;
  padding: 5px;
  background: #e6f3fe;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-left-icontwo {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #f371fa;
  padding: 5px;
  background: #fdf4fd;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-left-iconthree {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #fc1d1d;
  padding: 5px;
  background: #fdf4fd;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-left-iconfour {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #18b2fa;
  padding: 5px;
  background: #fdf4fd;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-right {
  color: #3ca0fd;
  cursor: pointer;
}
.index-centent-box {
  width: 100%;
  padding: 15px 15px 0;
  box-sizing: border-box;
}
</style>