<template>
	<view class="VBox">
		<view class="status_bar"></view>

		<view class="none" v-if="entry.length==0"><text>您的词条为空</text></view>

		<div v-else v-for="(item ,index) in entry" :key="index" class="main">
			<view class="entry"> 
				<view class="title"><text>{{item.title}}</text></view>
				<view class="describe"><text>{{item.describe}}</text></view>
				<view class="date">创建日期： {{item.createdate}}</view>
			</view>
			<hr>
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
				entry: []
			}
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
                })
		},
		methods: {
			
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
		height: 45px;
		font-size: 14px;
		color: rgb(85, 85, 85);
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.date{
		font-size: 10px;
		color: rgb(151, 151, 151);
	}
	.title{
		text-indent: 22px;
		background-image: url("/static/icon/entrytitle.png");
		background-repeat: no-repeat;
		background-size: 18px;
		background-position: 0px 8px;

		margin-top: 5px;
		font-size: 20px;
	}
	hr{
		border: none;
		height: 1px;
		width: 100%;
		background-color: rgba(158, 158, 158, 0.678);
	}
	.entry{
		height: 100px;
		width: 85%;
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
