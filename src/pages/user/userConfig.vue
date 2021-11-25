<template>
    <view class="VBox">
		<view class="status_bar"></view>

		<view class="user">
			<image :src="userInfo.photo" class="userPhoto" />
			<view class="userInfo">
				<view class="info username">{{userInfo.username}}</view>
				<view class="info userMail"><text>邮箱: {{userInfo.mail}}</text></view>
				<view class="info userGender"><text>性别: {{gender}}</text></view>
			</view>
		</view>

        <view class="config">
            <view class="setting reInfo" @tap="openModifyInfo">修改资料</view>
			<hr>
			<view class="setting rePassword" @tap="openChangePassword">修改密码</view>
			<hr>
			<view class="setting rePhoto">修改头像</view>
			<hr>
			<view class="setting" @tap="bindlLogout">退出登录</view>
        </view>
    </view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

    export default {
		computed: mapState([ 'hasLogin','userInfo']),
		data() {
			return {
				gender: "保密"
			}
		},
		onShow() {
			if (this.userInfo.gender == "male") {
				this.gender = "男";
			} else if (this.userInfo.gender == "female") {
				this.gender = "女"
			} else {
				this.gender = "保密"
			}
		},
		methods: {
			...mapMutations(['logout']),
			bindlLogout() {
				this.logout(),
				uni.navigateBack();
			},
			openModifyInfo(){
				uni.navigateTo({
					url: '/pages/user/modifyInfo'
				})
			},
			openChangePassword() {
				uni.navigateTo({
					url: '/pages/user/changePassword'
				})
			}
		}
	}
</script>

<style>
	hr{
		border: none;
		height: 0.5px;
		width: 100%;
		background-color: rgba(204, 204, 204, 0.678);
		/* margin: 12px 5% 10px; */
	}
	.setting{
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.username{
		font-size: 20px;
		font-weight: bolder;
		color: #FFFFFF;
		font-weight: 550;
	}
	.userPhoto{
		height: 55px;
		width: 55px;
		border-radius: 50px;
		background-color: #6d91f2;
	}
	.info{
		margin-left: 15px;
	}
	.userInfo{
		/* margin-left: 15px; */
		width: 85%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		color: white;
		font-size: 12px;
	}
	.user{
		margin-top: 15px;
		margin-bottom: 15px;
		width: 85%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
    .config{
        /* padding: 5px 0; */
		width: 90%;
		height: 250px;
		background-color: #ffffff;
		border-radius: 9px;
		margin-top: 10px;
		box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.733);
		display: flex;
		flex-direction: column;
		align-items: center;
    }
    .VBox{
		background: linear-gradient(#6d91f2, #6d91f2, #6d90f200);;
		width: 100%;
		height: 250px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.status_bar {
		height: 5px;
		width: 100%;
	}
</style>
