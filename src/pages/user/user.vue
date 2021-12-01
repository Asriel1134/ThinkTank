<template>
	<view class="VBox">
		<view class="status_bar"></view>
		<view class="user" v-if="!hasLogin">
			<image :src="userPhoto" class="userPhoto">
			<view class="userInfo">
				<view class="userID" @tap="bindLogin">登录/注册</view>
			</view>
		</view>
		<view class="user" v-else @tap="openUserConfig">
			<image :src="userPhoto" class="userPhoto">
			<view class="userInfo">
				<view class="userID">{{userInfo.username}}</view>
				<!-- <text class="userCount">我贡献的词条数：{{entryCount}}</text> -->
			</view>
		</view>

		<view class="userButtonArea">
			<!-- 收藏 -->
			<view id="userCollection" class="userButton" @tap="openUserCollection">
				<image src="/static/icon/ic_my_favorite.png">
				<text>我的收藏</text>
			</view>
			<!-- 历史 -->
			<view id="userHistory" class="userButton" @tap="openUserHistory">
				<image src="/static/icon/ic_my_history.png">
				<text>我的足迹</text>
			</view>
			<!-- 词条 -->
			<view id="userEntry" class="userButton" @tap="openUserEntry">
				<image src="/static/icon/ic_my_citiao.png">
				<text>我的词条</text>
			</view>
			<!-- 消息 -->
			<view id="userMessage" class="userButton">
				<image src="/static/icon/ic_my_im.png">
				<text>消息通知</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';

	export default {
		computed: mapState([ 'hasLogin','userInfo']),
		data() {
			return {
				entryCount: "55",
				userPhoto: ""
			}
		},
		onShow() {
			if (this.hasLogin){
				this.userPhoto = this.userInfo.photo;
			} else {
				this.userPhoto = "/static/icon/default.png"
			}
		},
		onLoad() {
			

		},
		methods: {
			bindLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			openUserConfig() {
				uni.navigateTo({
					url: '/pages/user/userConfig'
				})
			},
			openUserCollection() {
				if (this.hasLogin){
					uni.navigateTo({
						url: '/pages/user/userCollection'
					})
				} else {
					plus.nativeUI.toast("请先登录")
				}
			},
			openUserHistory() {
				if (this.hasLogin){
					uni.navigateTo({
						url: '/pages/user/userHistory'
					})	
				} else {
					plus.nativeUI.toast("请先登录")
				}
			},
			openUserEntry() {
				if (this.hasLogin){
					uni.navigateTo({
						url: '/pages/user/userEntry'
					})	
				} else {
					plus.nativeUI.toast("请先登录")
				}
			}
		}
	}
</script>

<style>
.userButton image{
	height: 30px;
	width: 30px;
	margin: 0 0 8px 0;
}
.userButton text{
	font-size: 8px;
	text-align: center;
}
.userButton{
	width: 20%;
	height: 75px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.userButtonArea{
	padding: 5px 0;
	width: 90%;
	height: 221px;
	background-color: #ffffff;
	border-radius: 9px;
	margin-top: 20px;
	box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.733);
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
.userID{
	font-size: 16px;
	color: #FFFFFF;
	font-weight: 550;
}
.userCount{
	font-size: 11px;
	color: rgb(219, 219, 219);
}
.userPhoto{
	height: 55px;
	width: 55px;
	border-radius: 50px;
	background-color: #6d91f2;
	margin-right: 15px;
}
.userInfo{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.user{
	margin-top: 10px;
	display: flex;
	flex-direction: row;
	width: 85%;
	height: 55px;
}
.VBox{
	background-color: #6d91f2;
	width: 100%;
	height: 110px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.status_bar {
  	height: 5px;
 	width: 100%;
}
</style>
