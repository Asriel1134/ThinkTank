<template>
	<view class="VBox">
		<view class="status_bar"></view>

		<view class="collection">

		</view>
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
				collection: []
			}
		},
		onLoad() {
			let userid = this.userInfo.userid
			
			uni.request({
                    url: `${this.$serverUrl}`,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        "userid" : userid
                    },
                    method: "POST",
                    success: (e) => {
						plus.nativeUI.toast("成功")
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
