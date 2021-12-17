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
			<input @tap="openSearch" type="text" class="searchText" :value="searchText" disabled="true">
		</view>

		<view class="content">
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="7000" :duration="800"  class="swiper" indicator-color="rgba(223, 223, 223, 0.733)" indicator-active-color="rgb(255, 255, 255)" circular="true">
				<swiper-item v-for="(item ,index) in swiperInfo" :key="index">
					<view class="swiper-item" :data-title="item.title" @tap="openEntry">
						<image class="swiper-image" :src="item.image" mode="aspectFill"></image>
						<image class="swiper-background" src="../../static/swiper/swiperbackground.png" mode="scaleToFill"></image>
						<text class="swiper-text">{{item.title}}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 热搜 -->
		<view class="subtitle"><text>热搜词条</text></view>
		<view class="content">
			<view class="hotSearch">
				<view v-for="(item,index) in hotSearchInfo" :key="index" style="height: 73px;"  :data-title="item.title" @tap="openEntry">
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
			<view class="history"  :data-title="historyInfo.title" @tap="openEntry">
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
				<image :src="historyInfo.image" id="hisImage" mode="aspectFill">
			</view>
		</view>

		<view class="subtitle"><text>推荐</text></view>
		<view v-for="(item ,index) in waterfall" :key="index" class="waterfallmain">
			<view class="waterfallentry" :data-title="item.title" @tap="openEntry"> 
				<view class="waterfalltitle"><text>{{item.title}}</text></view>
				<view class="waterfalldescribe"><text>{{item.describe}}</text></view>
				<view class="waterfalldate">创建日期: {{item.createdate}}</view>
			</view>
		</view>
		<view v-if="randomLoading" class="loading">加载中……</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				loading: true,

				randomLoading: true,

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

				searchText : "",

				swiperInfo: [],

				hotSearchInfo: [],

				historyInfo: {},

				waterfall: []
			}
		},
		onPullDownRefresh() {
			uni.request({
				url: `${this.$serverUrl}/getRandomEntry`,
				method: 'POST',
				data: {},
				success: res => {
					this.waterfall = res.data.entry;
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: `${this.$serverUrl}/index`,
				method: 'GET',
				data: {},
				success: res => {
					// this.searchText = res.data.searchText,
					this.swiperInfo = res.data.swiper;
					this.hotSearchInfo = res.data.hotSearch,
					this.historyInfo = res.data.historyInfo
					this.searchText = "大家正在搜索:" + res.data.searchText
				},
				fail: () => {console.log(1);},
				complete: () => {}
			});
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			uni.request({
				url: `${this.$serverUrl}/getRandomEntry`,
				method: 'POST',
				data: {},
				success: res => {
					this.waterfall.push(res.data.entry[0])
					this.waterfall.push(res.data.entry[1])
					this.waterfall.push(res.data.entry[2])
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onReady() {
		},
		onLoad() {
			uni.request({
				url: `${this.$serverUrl}/index`,
				method: 'GET',
				data: {},
				success: res => {
					// this.searchText = res.data.searchText,
					this.swiperInfo = res.data.swiper;
					this.hotSearchInfo = res.data.hotSearch,
					this.historyInfo = res.data.historyInfo
					this.searchText = "大家正在搜索:" + res.data.searchText
				},
				fail: () => {console.log(1);},
				complete: () => {}
			});
			uni.request({
				url: `${this.$serverUrl}/getRandomEntry`,
				method: 'POST',
				data: {},
				success: res => {
					this.waterfall = res.data.entry;
				},
				fail: () => {console.log(1);},
				complete: () => {}
			});
		},
		methods: {
			...mapMutations(['logout']),
			openSearch(e) {
				uni.navigateTo({
					url: '../search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			openEntry(e) {
				var title = e.currentTarget.dataset.title;
				uni.navigateTo({
					url: '../entry/entry?title=' + title,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.loading{
		text-align: center;
		padding: 5px 0 10px 0;
		font-size: 10px;
	}
	.waterfalldescribe{
		font-size: 12px;
		color: rgb(116, 116, 116);
		max-height: 35px;
		margin-left: 3%;
		width: 94%;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.waterfalldate{
		font-size: 10px;
		margin-left: 3%;
		color: rgb(151, 151, 151);
		margin-bottom: 3px;
	}
	.waterfalltitle{
		text-indent: 22px;
		background-image: url("/static/icon/indexentrytitle.png");
		background-repeat: no-repeat;
		background-size: 20px;
		background-position: 0px 5px;

		margin-left: 3%;
		width: 94%;

		color: #cf8f03;
		overflow: hidden;
 		white-space: nowrap;
 		text-overflow: ellipsis;
		 
		margin-top: 5px;
		font-size: 18px;
	}
	.waterfallentry{
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		border-radius: 9px;
		margin-top: 8px;
		margin-bottom: 10px;
		box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.733);
		height: 100px;
		width: 90%;
	}
	.waterfallmain{
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
	}


	#hisLeft{
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		width: 75%;
	}
	#hisTitle{
		font-size: 16px;
		margin: 0px 0px 0px 12px;
	}
	#hisDescribe{
		font-size: 11px;
		margin: 0 14px;
		color: rgb(151, 151, 151);
		overflow: hidden;
 		white-space: nowrap;
 		text-overflow: ellipsis;
	}
	#hisImage{
		height: 85px;
		width: 20%;
		/* width: 100px; */
		margin: 10px 10px 10px 0;
		border-radius: 5px;
	}
	.history{
		width: 90%;
		height: 105px;
		background-color: #ffffff;
		border-radius: 9px;
		/* border: 1px rgb(117, 117, 117) solid; */
		margin-top: 8px;
		margin-bottom: 0px;
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
		background-image: url("/static/icon/ic_hot.png");
		background-repeat: no-repeat;
		background-size: 13px;
		background-position: 0 16px;
	}
	#hotSearchDescribe{
		font-size: 11px;
		color: rgb(151, 151, 151);
		overflow: hidden;
 		white-space: nowrap;
 		text-overflow: ellipsis;
	}
	#hotSearchLine2{
		display: flex;
		margin: 5px 14px;
		width: 90%;
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
		height: 110px;
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
	.swiper-image{
		border-radius: 9px;
		height: 215px;
		width: 100%;
		/* margin: 0 20px 0 0; */
		z-index: 1;
		position: absolute;
	}
	.swiper-text{
		z-index: 3;
		position: absolute;
		left: 12px;
		top: 175px;
		font-size: 17px;
		color: #ffffff;
	}
	.swiper-background{
		border-radius: 9px;
		height: 215px;
		width: 100%;
		/* margin: 0 20px 0 0; */
		z-index: 2;
		position: absolute;
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
