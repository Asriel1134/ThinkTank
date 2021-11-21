<template>
	<view class="VBox">
		<view class="status_bar"></view>
		<view class="search">
			<input type="text" class="searchText" focus="true" confirm-type="搜索" @confirm="search">
		</view>

		<view class="searchHistory">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			search(){
				var entryID = '';

				// uni.request({
				// 	url: '',
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		entryID = res.entryID;
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });

				uni.navigateTo({
					url: '../entry/entry?entryID=' + entryID,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.search{
		width: 90%;
		display: flex;
		justify-content:center;
		margin: 0 0 0 0;
	}
	.searchText{
		background-color: rgba(51, 51, 51, 0.22);
		border-radius: 20px;
		width: 95%;
		height: 31px;
		display: flex;
		text-indent: 40px;
		color: rgba(0, 0, 0, 0.733);
		font-size: 10px;
		background-image: url("/static/icon/search_black.png");
		background-repeat: no-repeat;
		background-size: 13px;
		background-position: 15px 9px;
	}
	.VBox{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.status_bar {
      	height: 5px;
     	width: 100%;
	}
</style>
