<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		onLaunch: function() {
			uni.getStorage({
				key: 'userInfo',
				success:(res) => {
					this.login(res.data);
					// 如果还需要重新校验或是想要刷新token的有效时间 就再联网请求一次
				},
				fail:(res) => {
					console.log("fail");
				}
			});
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login'])
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
