<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="system name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getSystemDetail">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="systemDetails" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="appname" label="System Name" width="150" sortable>
				</el-table-column>
				<el-table-column prop="tag" label="tag" width="200" sortable>
				</el-table-column>
				<el-table-column prop="createdUser" label="Created User" width="150" sortable>
				</el-table-column>
				<el-table-column prop="createdTime" label="Created Time" width="200" sortable>
				</el-table-column>
				<el-table-column prop="isBlock" label="isBlock" min-width="120" :formatter="formatBlock" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>


<script>
	//导入 api
	import { apiGetSystemDetails } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				systemDetails: [
				]
			}
		},
		methods: {
			//锁定显示转换
			formatBlock: function (row, column) {
				return row.isBlock == 1 ? 'yes' : row.isBlock == 0 ? 'no' : 'unknow';
			},
			//获取用户列表
			getSystemDetail: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				//这里是api请求名称
				apiGetSystemDetails(para).then((res) => {
					//console.log(res.data);
					this.systemDetails = res.data.systemDetails;
					this.loading = false;
					//NProgress.done();
				});
			}
		},
		mounted() {
			this.getSystemDetail();
		}
	};

</script>

<style scoped>

</style>
