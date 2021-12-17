<template>
	<view class="VBox">
		<view class="status_bar"></view>

		<view class="none" v-if="loading"><text>加载中……</text></view>

		<view class="none" v-else-if="entry.length==0"><text>您的词条为空</text></view>

		<div v-else v-for="(item ,index) in entry" :key="index" class="main">
			<view class="entry" :data-title="item.title" @tap="openEntry"> 
				<view class="title"><text>{{item.title}}</text></view>
				<view class="describe"><text>{{item.describe}}</text></view>
				<view class="date">创建日期: {{item.createdate}}</view>
			</view>
		</div>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';

	export default {
		computed: mapState(['userInfo']),
		data() {
			return {
				entry: [],
				loading: true
			}
		},
		onPullDownRefresh() {
			let userid = this.userInfo.userid
			uni.request({
                    url: `${this.$serverUrl}/getEntryUserList`,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        "userid" : userid
                    },
                    method: "POST",
                    success: (e) => {
						this.entry = e.data.entries;
                    },
                    fail: (e) => {
                        plus.nativeUI.toast("请求失败，请重试！")
                    },
					complete: () => {
						this.loading = false;
						uni.stopPullDownRefresh();
					}
                })
		},
		onLoad() {
			let userid = this.userInfo.userid
			
			uni.request({
                    url: `${this.$serverUrl}/getEntryUserList`,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        "userid" : userid
                    },
                    method: "POST",
                    success: (e) => {
						this.entry = e.data.entries;
                    },
                    fail: (e) => {
                        plus.nativeUI.toast("请求失败，请重试！")
                    },
					complete: () => {
						this.loading = false;
					}
                })
		},
		methods: {
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
	.none{
		font-size: 20px;
		color: #4979ff;
		display: flex;
		width: 100%;
		height: 300px;
		justify-content:center;
		align-items: center;
	}
	.describe{
		font-size: 12px;
		color: rgb(116, 116, 116);
		max-height: 35px;
		margin-left: 3%;
		width: 94%;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.date{
		font-size: 10px;
		margin-left: 3%;
		color: rgb(151, 151, 151);
		margin-bottom: 3px;
	}
	.title{
		text-indent: 22px;
		background-image: url("/static/icon/entrytitle.png");
		background-repeat: no-repeat;
		background-size: 20px;
		background-position: 0px 5px;

		margin-left: 3%;
		width: 94%;

		color: #4979ff;
		overflow: hidden;
 		white-space: nowrap;
 		text-overflow: ellipsis;
		 
		margin-top: 5px;
		font-size: 18px;
	}
	.entry{
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		border-radius: 9px;
		margin-top: 8px;
		margin-bottom: 1px;
		box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.733);
		height: 100px;
		width: 90%;
	}
	.main{
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
	}

	.VBox{
		width: 100%;
		height: 195px;
	}
	.status_bar {
		background-color: #6d91f2;
      	height: 5px;
     	width: 100%;
	}
</style>
