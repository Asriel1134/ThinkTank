<template>
	<view class="VBox">
		<view class="status_bar"></view>

		<view class="changePhoto">
			<text class="changePhotoTitle">修改头像</text>

			<view class="changePhotoForm">
				<view class="choose">
					<image class="photo" :src="imageUrl" />
					<view class="button-view">
						<button type="primary" class="choosePhotobutton" @tap="chooseImage">选择图片</button>
					</view>
				</view>
				<view class="button-view">
					<button type="primary" :loading="loading" class="changePhotobutton" @tap="bindChangePhoto">保存</button>
				</view>
			</view>
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
				imageUrl: "",
			}
		},
		onLoad() {
			this.imageUrl = this.userInfo.photo
		},
		methods: {
			...mapMutations(['login']),
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					crop: {
						quality: 100,
						width: 512,
						height: 512,
					},
					success: (res) => {
						this.imageUrl = res.tempFilePaths[0];
					},
					complete: () => {
						
					}
				});
			},
			bindChangePhoto(e) {
				this.loading = true;
				console.log(this.userInfo.mail)
				console.log(this.imageUrl)
				uni.uploadFile({
                    url: `${this.$serverUrl}/uploadPhoto`,
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
					name: 'file',
                    formData: {
						mail: this.userInfo.mail
                    },
					filePath: this.imageUrl,
                    success: (e) => {
						const data = JSON.parse(e.data);
						console.log(data);
                        this.login(data.userInfo);
						plus.nativeUI.toast("保存成功")
						uni.navigateBack();
                    },
                    fail: (e) => {
						plus.nativeUI.toast("请求失败，请重试！")
                    },
                    complete: () => {
                        this.loading = false;
                    }
                })
			},
		}
	}
</script>

<style>
	.choose{
		display: flex;
		width: 100%;
		align-items: center;
	}
	.photo{
		height: 150px;
		width: 150px;
		border-radius: 100px;
		background-color: #ffffff;
		margin-right: 15px;
	}
	.choosePhotobutton{
		/* margin-top: 25px; */
		margin-left: 25px;
		/* margin-bottom: 30px; */
		border-radius: 9px;
		width: 85%;
		/* line-height: 30px; */
	}
	.changePhotobutton{
		margin-top: 45px;
		margin-bottom: 30px;
		border-radius: 9px;
		width: 80%;
		/* height: 15px; */
	}
	.usernameInput{
		background-image: url("/static/icon/username.png");
	}
	.mailInput{
		background-image: url("/static/icon/mail.png");
	}
	.passwordInput{
		background-image: url("/static/icon/password.png");
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
	.changePhotoForm{
		display: flex;
        flex: 1;
        flex-direction: column;
        width: 520upx;
        padding-top: 30upx;
	}


	.changePhotoTitle{
		margin-top: 15px;
		margin-bottom: 20px;
		font-size: 22px;
		font-weight: 550;
	}
	.changePhoto{
		padding: 5px 0;
		width: 90%;
		height: 350px;
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
