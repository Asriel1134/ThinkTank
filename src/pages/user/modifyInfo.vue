<template>
	<view class="VBox">
		<view class="status_bar"></view>

		<view class="modify">
			<text class="modifyTitle">修改资料</text>

			<form class="modifyForm" @submit="bindModify">
				<view class="input-view">
					<input class="input usernameInput" :value="this.userInfo.username" name="usernameValue" />
				</view>
				<radio-group class="input-view radio-view" @change="chengeGender">
					<view style="width:35px"></view>
					<radio value="male" class="genderInput" :checked="userInfo.gender=='male'">男</radio>
					<radio value="female" class="genderInput" :checked="userInfo.gender=='female'">女</radio>
					<radio value="unknow" class="genderInput" :checked="userInfo.gender=='unknow'">保密</radio>
				</radio-group>
				<view class="button-view">
					<button type="primary" :loading="loading" class="modifybutton" formType="submit">保存</button>
				</view>
			</form>
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
				loading: false,
				gender: "",
				flag: true
			}
		},
		onLoad() {
			this.gender = this.userInfo.gender
		},
		methods: {
			chengeGender(e) {
				this.gender = e.detail.value;
			},
			bindModify(e) {
				let username = e.detail.value.usernameValue,
					mail = this.userInfo.mail;
				if ((this.userInfo.username != this.username) && this.username != "") {
					uni.request({
						url: `${this.$serverUrl}/reUsername`,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        "mail": mail,
						"username": username,
                    },
                    method: "POST",
                    success: (e) => {
                        if (e.data.result == 0) {
							this.login(e.data.userInfo);
							plus.nativeUI.toast("保存成功")
							this.flag = false;
                            uni.navigateBack();
                        } else {
							plus.nativeUI.toast("error" + e.data.info)
                        }
                    },
                    fail: (e) => {
						plus.nativeUI.toast("请求失败，请重试！")
                    },
                    complete: () => {
                        this.loading = false;
                    }
					})
				}
				
				if (this.userInfo.gender != this.gender) {
					uni.request({
						url: `${this.$serverUrl}/reGender`,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        "mail": mail,
						"gender": this.gender,
                    },
                    method: "POST",
                    success: (e) => {
                        if (e.data.result == 0) {
							this.login(e.data.userInfo);
							if (this.flag){
								plus.nativeUI.toast("保存成功")
								uni.navigateBack();
							}
                        } else {
							plus.nativeUI.toast("error" + e.data.info)
                        }
                    },
                    fail: (e) => {
						plus.nativeUI.toast("请求失败，请重试！")
                    },
                    complete: () => {
                        this.loading = false;
                    }
					})
				}
			},
			...mapMutations(['login'])
		}
	}
</script>

<style>
	.radio-view{
		background-color: rgba(168, 168, 168, 0.22);
		border-radius: 9px;
		margin-bottom: 8px;
		height: 40px;
		width: 100%;

		background-repeat: no-repeat;
		background-size: 20px;
		background-position: 12px 10px;
		background-image: url("/static/icon/username.png");
	}
	.genderInput{
		transform: scale(0.7);
	}
	.modifybutton{
		margin-top: 25px;
		margin-bottom: 30px;
		border-radius: 9px;
		width: 80%;
		/* height: 15px; */
	}
	.usernameInput{
		background-image: url("/static/icon/username.png");
	}
	.input{
		background-color: rgba(168, 168, 168, 0.22);
		border-radius: 9px;
		margin-bottom: 8px;
		height: 40px;
		width: 100%;

		display: flex;
		text-indent: 43px;
		color: rgba(0, 0, 0, 0.733);
		font-size: 10px;
		
		background-repeat: no-repeat;
		background-size: 20px;
		background-position: 12px 10px;
	}
	.label{
		font-size: 18px;
		font-weight: 500;
	}
	.input-view{
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.modifyForm{
		display: flex;
        flex: 1;
        flex-direction: column;
        width: 520upx;
        padding-top: 30upx;
	}


	.modifyTitle{
		margin-top: 15px;
		margin-bottom: 20px;
		font-size: 22px;
		font-weight: 550;
	}
	.modify{
		padding: 5px 0;
		width: 90%;
		height: 290px;
		background-color: #ffffff;
		border-radius: 9px;
		margin-top: 40px;
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
