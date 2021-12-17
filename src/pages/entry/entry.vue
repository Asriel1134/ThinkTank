<template>
	<view class="VBox">
		<view class="status_bar"></view>
		<!-- <text>{{title}}</text> -->
		<rich-text :nodes="text"></rich-text>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';

	export default {
		computed: mapState(['userInfo','hasLogin']),
		data() {
			return {
				title: "",
				text: "",
				entryid: 0,
				collected: false
			}
		},
		onNavigationBarButtonTap(e) {
			if (!this.collected){
				this.addCollection();
			} else {
				this.deleteCollection();
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title,
			})
			
		},
		onLoad: async function(e){
			this.title = e.title;
			await this.getEntry();
			this.addHistory();
			this.isCollectionExist();
		},
		methods: {
			getEntry: function() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: `${this.$serverUrl}/getEntry`,
						method: 'GET',
						data: {
							title: this.title
						},
						success: res => {
							this.title = res.data.entryInfo.title,
							this.text = res.data.entryInfo.text
							this.entryid = res.data.entryInfo.entryid
							if(this.text!= null){
								this.text = this.text.replace("float:right",' ');
								this.text = this.text.replace("float: right",' ');
								this.text = this.text.replace("width:600px",'width:300px');
							}
							resolve(res)
						},
						fail: (err) => {
							reject(err)
						},
						complete: () => {}
					});
				})
			},
			addHistory() {
				if (this.hasLogin) { 
					uni.request({
						url: `${this.$serverUrl}/addHistory`,
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						data: {
							entryid: this.entryid,
							userid: this.userInfo.userid
						},
						success: res => {
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			addCollection() {
				if (this.hasLogin) {
					uni.request({
						url: `${this.$serverUrl}/addCollection`,
						method: 'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: {
							entryid: this.entryid,
							userid: this.userInfo.userid
						},
						success: res => {
							if (res.data.result == 0 || res.data.result == 1){
								plus.nativeUI.toast("收藏成功")
								
								this.collected = true;

								var webView = this.$mp.page.$getAppWebview();  

								webView.setTitleNViewButtonStyle(0, {  
									text: '\ue629',  
								});  
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					plus.nativeUI.toast("请先登录")
				}
			},
			deleteCollection() {
				if (this.hasLogin) {
					uni.request({
						url: `${this.$serverUrl}/deleteCollection`,
						method: 'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: {
							entryid: this.entryid,
							userid: this.userInfo.userid
						},
						success: res => {
							if (res.data.result == 0){
								plus.nativeUI.toast("取消收藏")

								this.collected = false;

								var webView = this.$mp.page.$getAppWebview();  

								webView.setTitleNViewButtonStyle(0, {  
									text: '\ue7b3',  
								});  
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			isCollectionExist: function() {
				if (this.hasLogin) {
					return new Promise((resolve, reject) => {
						uni.request({
							url: `${this.$serverUrl}/isCollectionExist`,
							method: 'POST',
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: {
								entryid: this.entryid,
								userid: this.userInfo.userid
							},
							success: res => {
								if (res.data.result == 0){
									this.collected = true;

									var webView = this.$mp.page.$getAppWebview();  

									webView.setTitleNViewButtonStyle(0, {  
										text: '\ue629',  
									});  
								}
							},
							fail: () => {},
							complete: () => {}
						});
					})
				}
			}
		}
	}
</script>

<style>
table {
		float: none;
	}
	p {
		text-align: left;
	}	
	rich-text p {
		margin-top: 25px;
		margin-left: 5px;
		font-size: 19px;
		padding-top: 6px;
		word-wrap: break-word;
		color: #333;
		margin-bottom: 15px;
		text-indent: 2em;
		line-height: 24px;
		zoom: 1;
	}
	
	rich-text div {
		max-width: 90vw;
	}
	rich-text img {
		max-width: 80vw;
	}
	rich-text span {
		padding-left: 2px;
		margin-top: 5px;
		text-align: left;
	}
	rich-text table {
		float:none;
		width:400px;
		/* margin:0 auto; */
		border: 0.7px solid #26CA9B;
		border-radius: 15px;
		border-collapse: collapse;
		max-width: 85vw;
		/* margin:0 10px; */
		margin: auto;
		display: table;
		font-size: 89%;
		text-align: center;
		max-width: 100%;
		/* background-color: rgba(251,251,251,0.8); */
	}
	
	rich-text .infobox {
		/* float: none; */
		display: table;
		font-size: 89%;
		text-align: center;
		width: 500px;
		max-width: 95vw;
		    /* float: right; */
		background-color: rgba(251,251,251,0.8);
		clear: both;
	}
	
	rich-text .image img{
		padding-left: 20px;
		max-width: 70vw;
		max-height: 300px;
	}
	
	rich-text th {
		background-color: #26ca9b;
		max-width: 85vw;
		text-align: center;
	}
	
	rich-text tr {
		display: table-row;
		max-width: 85vw;
	}
	rich-text td {
		max-width: 85vw;
		border: 0.5px solid #26CA9B
	}
	
	rich-text p a img {
		max-width: 87vw;
	} 
	
	rich-text ul {
		margin-bottom: 5px;
		padding-top: 1.5em;
		text-align: left;
	}
	
	rich-text h1,h2,h3 {
		margin-top: 16px;
		margin: 0;
		overflow: hidden;
		padding-top: 1.5em;
		text-align: left;
	}
	
	rich-text h2 {
		border-bottom:1px solid #00aaff; 
		border-width: 3px;
		height: 32px;	
		}
	
	rich-text h3 {
		padding-top: 1em;
	}
	rich-text h2 span,h3 span{
		padding-left: 5px;
		/* margin-top: 10px; */
		font-family: 'Linux Libertine','Georgia','Times',serif;
		line-height: 1.3;
		margin-bottom: 0.25em;
		font-size: 0.95em;
		margin-top: 1em;
	}
	
	rich-text dl {
		margin-left: 25px;
		max-width: 70%;
	}
	rich-text dd{
		max-width: 70vw;
	}	
	rich-text caption {
		font-size: 18px;
	}
	rich-text{
		display: flex;
		width: 94%;
		margin-left: 3%;
		/* text-align: center; */
		padding-bottom: 30px;
	}
	.VBox {
		/* background-color: #6d91f2; */
		width: 100%;
		background-color: #F7F3E7;
		/* height: 195px; */
	}
	.status_bar {
	height: 5px;
	width: 100%;
	}
</style>
