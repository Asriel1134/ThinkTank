<template>
  <view class="VBox">
    <view class="status_bar"></view>
    <!-- <text>{{title}}</text> -->
    <rich-text :nodes="string"></rich-text>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				title: "title",
				string: ""
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title,
			})
		},
		onLoad: function(e){
			this.title = e.title;
			uni.request({
				url: `${this.$serverUrl}/getEntry`,
				method: 'GET',
				data: {
					title: this.title
				},
				success: res => {
					console.log(res)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
.VBox {
  /* background-color: #6d91f2; */
  width: 100%;
  /* height: 195px; */
}
.status_bar {
  height: 5px;
  width: 100%;
}
</style>
