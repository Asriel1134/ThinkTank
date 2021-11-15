<template>
	<view class="VBox">
		<view class="status_bar">
      	</view>
		<!-- 标题 -->
		<!-- <view class="title"> -->
			<!-- <text>百度百科</text> -->
		<!-- </view> -->
		<!-- 搜索框 -->
		<view class="search">
			<input @focus="" type="text" class="searchText" :value="searchText">
		</view>

		<view class="content">
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="7000" :duration="800"  class="swiper" indicator-color="rgba(223, 223, 223, 0.733)" indicator-active-color="rgb(255, 255, 255)" circular="true">
				<swiper-item v-for="(item ,index) in swiperInfo" :key="index">
					<view class="swiper-item">
						<image class="swiper-image" :src="item" mode="scaleToFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 热搜 -->
		<view class="subtitle"><text>热搜词条</text></view>
		<view class="content">
			<view class="hotSearch">
				<view v-for="(item,index) in hotSearchInfo" :key="index" style="height: 73px;">
					<view id="hotSearchLine1">
						<view id="line1Left">
							<text class="rank" :style="[{color: rankColor[index].font, borderColor: rankColor[index].border}]">TOP.{{index+1}}</text>
							<text id="hotSearchTitle">{{item.title}}</text>
						</view>
						<view id="heat">
							<text id="hotSearchHeat">热度 {{item.heat}}</text>
						</view>
					</view>
					<view id="hotSearchLine2">
						<text id="hotSearchDescribe">{{item.describe}}</text>
					</view>
					<hr v-if="index != 2">
				</view>
			</view>
		</view>
		<!-- 历史上的今天 -->
		<view class="subtitle"><text>历史上的今天</text></view>
		<view class="content">
			<view class="history">
				<view id="hisLeft">
					<view id="hisTitle">
						<text>
							{{historyInfo.title}}
						</text>
					</view>
					<view id="hisDescribe">
						<text>
							{{historyInfo.describe}}
						</text>
					</view>
				</view>
				<image :src="historyInfo.image" id="hisImage">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText : "大家正在搜索：双城之战",
				rankColor: [{
					font: "rgb(246,78,84)",
					border: "rgb(239, 191, 189)",
				},{
					font: "rgb(250,175,82)",
					border: "rgb(237, 207, 171)",
				},{
					font: "rgb(107,134,247)",
					border: "rgb(185, 196, 242)",
				}],


				swiperInfo: ["/static/swiper/1.png", "/static/swiper/2.png"],

				hotSearchInfo: [{
					title: "党的十九届六中全会精神",
					describe: "中共中央介绍十九届六种全会精神",
					heat: 99
				},{
					title: "人民解放军空军建军节",
					describe: "人民空军成立27周年",
					heat: 98
				},{
					title: "神州十三号",
					describe: "神州十三号航天员完成首次出舱活动",
					heat: 97
				},],

				historyInfo: {
					title: "1840年，法国著名法国雕塑艺术家奥古斯特·罗丹出生",
					describe: "罗丹是法国著名雕塑家。他在欧洲雕塑史上的地位无人能及。",
					image: "/static/his/his.jpeg"
				}
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',  
    			backgroundColor: '#cf8f03',  
			})

		},
		methods: {

		}
	}
</script>

<style>
	#hisTitle{
		font-size: 16px;
		margin: 18px 0px 18px 12px;
		width: 250px;
	}
	#hisDescribe{
		font-size: 11px;
		margin: 0 14px;
		color: rgb(151, 151, 151);
		width: 250px;
		overflow: hidden;
 		white-space: nowrap;
 		text-overflow: ellipsis;
	}
	#hisImage{
		height: 100px;
		/* width: 100px; */
		margin: 10px 10px 0 0;
		border-radius: 5px;
	}
	.history{
		width: 90%;
		height: 120px;
		background-color: #ffffff;
		border-radius: 9px;
		/* border: 1px rgb(117, 117, 117) solid; */
		margin-top: 8px;
		box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.733);

		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.rank{
		height: 13px;
		padding: 1px 5px 2px 5px;
		margin: 14px 0px 0px 12px;
		font-size: 10px;
		font-weight: 800;
		border-radius: 15px;
		text-align: center;
		border: 1px solid ;

		border-color: rgb(255, 139, 143);
	}
	#line1Left{
		display: flex;
	}
	#hotSearchTitle{
		font-size: 16px;
		margin: 10px 0px 0px 8px;
	}
	#hotSearchHeat{
		font-size: 9px;
		margin: 15px 20px;
		color: rgb(151, 151, 151);
	}
	#heat{
		display: flex;
		background-image: url("/static/icon/heat.png");
		background-repeat: no-repeat;
		background-size: 13px;
		background-position: 0 16px;
	}
	#hotSearchDescribe{
		font-size: 11px;
		margin: 0 14px;
		color: rgb(151, 151, 151);
	}
	#hotSearchLine1{
		height: 37px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	hr{
		border: none;
		height: 0.5px;
		width: 90%;
		background-color: rgba(204, 204, 204, 0.678);
		margin: 12px 5% 10px;
	}
	.hotSearch{
		width: 90%;
		height: 221px;
		background-color: #ffffff;
		border-radius: 9px;
		/* border: 1px rgb(117, 117, 117) solid; */
		margin-top: 8px;
		box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.733);

		display: flex;
		flex-direction: column;
	}
	.VBox{
		background-color: #cf8f03;
		width: 100%;
		height: 195px;
	}
	.status_bar {
      	height: 5px;
     	width: 100%;
	}
	/* .title{
		font-size: 15px;
		color: #ffffff;
		display: flex;
		justify-content:center;
		letter-spacing: 1px;
		font-weight: 600;
		line-height: 40px;
	} */
	.search{
		display: flex;
		justify-content:center;
		margin: 0 0 0 0;
	}
	.searchText{
		background-color: rgba(51, 51, 51, 0.22);
		border-radius: 20px;
		width: 90%;
		height: 31px;
		display: flex;
		text-indent: 40px;
		color: rgba(223, 223, 223, 0.733);
		font-size: 10px;
		background-image: url("/static/icon/search.png");
		background-repeat: no-repeat;
		background-size: 13px;
		background-position: 15px 9px;
	}
	.swiper{
		margin: 18px 0 0 0;
		height: 215px;
		width: 90%;
		border-radius: 9px;
	}
	.swiper-item{
		text-align: center;
	}
	.swiper-image{
		border-radius: 9px;
		height: 215px;
		width: 100%;
		/* margin: 0 20px 0 0; */
	}
	.subtitle{
		display: flex;
		font-size: 16px;
		color: #000000;
		letter-spacing: 1px;
		font-weight: 700;
		margin-top: 13px;
		margin-left: 5%;
		margin-bottom: 5px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
</style>
