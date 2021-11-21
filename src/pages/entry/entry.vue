<template>
	<view class="VBox">
		<view class="status_bar"></view>
		<text>{{entryID}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				entryID : "",
				title: "title",
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title,
			})
		},
		onLoad: function(e){
			this.entryID = e.entryID;
			if (this.entryID == -1){
				this.title = '百科';
			} else{
				// uni.request({
				// 	url: '',
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		this.title = res.title;
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.VBox{
	/* background-color: #6d91f2; */
	width: 100%;
	/* height: 195px; */
}
.status_bar {
  	height: 5px;
 	width: 100%;
}
</style>
