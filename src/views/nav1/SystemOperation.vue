<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" >
				<el-form-item>
					<el-input v-model="filters.name" placeholder="appname"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getSystemDetail">Query</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">Add</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="testButton">Test</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="systemDetails" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="appname" label="System Name" width="150" sortable>
			</el-table-column>
			<el-table-column prop="tag" label="tag" width="200" sortable>
			</el-table-column>
			<el-table-column prop="createdUser" label="Created User" width="150" sortable>
			</el-table-column>
			<el-table-column prop="createdTime" label="Created Time" width="150" sortable>
			</el-table-column>
			<el-table-column prop="isBlock" label="isBlock" width="110" :formatter="formatBlock" sortable>
			</el-table-column>
			<el-table-column prop="description" label="description" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="appname" prop="appname">
					<el-input v-model="editForm.appname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="tag" prop="tag">
					<el-input v-model="editForm.tag" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="createdUser" prop="createdUser">
					<el-input v-model="editForm.createdUser" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="createdTime">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.createdTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="need block">
					<el-radio-group v-model="editForm.isBlock">
						<el-radio class="radio" :label="1">yes</el-radio>
						<el-radio class="radio" :label="0">no</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="description">
					<el-input type="textarea" v-model="editForm.description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="appname" prop="appname">
					<el-input v-model="addForm.appname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="tag" prop="tag">
					<el-input v-model="addForm.tag" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Created User">
					<el-input v-model="addForm.createdUser" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="Created Time">
					<el-date-picker type="date" placeholder="click me" v-model="addForm.createdTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="need block">
					<el-radio-group v-model="addForm.isBlock">
						<el-radio class="radio" :label="1">yes</el-radio>
						<el-radio class="radio" :label="0">no</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="description">
					<el-input type="textarea" v-model="addForm.description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">cancel</el-button>
				<!--给vue组件绑定事件时候，必须加上native ，否则会认为监听的是来自Item组件自定义的事件-->
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--Test界面-->
		<el-dialog title="Test" v-model="testFormVisible" :close-on-click-modal="false">
			<el-form :model="testForm" label-width="120px" :rules="testFormRules" ref="testForm">
				<el-form-item label="testappname" prop="testappname">
					<el-input v-model="testForm.testappname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="testdescription" prop="testdescription">
					<el-input type="textarea" v-model="testForm.testdescription"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="testFormVisible = false">cancel</el-button>
				<!--给vue组件绑定事件时候，必须加上native ，否则会认为监听的是来自Item组件自定义的事件-->
				<el-button type="primary" @click.native="testSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>


<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import { apiGetSystemDetailListPage, apiGetSystemDetails, removeSystemDetail, addSystemDetail, editSystem, requestSuccess2, batchRemoveSystem } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					appname: ''
				},
				systemDetails: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					appname: '',
					tag: '',
					createdUser: '',
					createdTime: '',
					isBlock: 0,
					description: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					//trigger: 'blur' 触发方式，blur 失去焦点事件，focus 获取焦点事件，change数据改变
					appname: [
						{ required: true, message: '请输入appname', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					appname: '',
					tag: '',
					createdUser: '',
					createdTime: '',
					isBlock: 0,
					description: ''
				},
				testFormVisible: false,//新增界面是否显示
				testFormRules: {
					//trigger: 触发方式，blur 失去焦点事件，focus 获取焦点事件，change数据改变
					testappname: [
						{ required: true, message: '请输入appname', trigger: 'blur' }
					],
					testdescription: [
						{ required: true, message: '请输入description', trigger: 'blur' }
					]
				},
				//test界面数据
				testForm: {
					testappname: '',
					testdescription: ''
				}

			}
		},
		methods: {
		//锁定显示转换
			formatBlock: function (row, column) {
				return row.isBlock == 1 ? 'yes' : row.isBlock == 0 ? 'no' : 'unknow';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getSystemDetail();
			},
			//获取系统列表
			getSystemDetail: function () {
				//console.log("getSystemDetail");
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				//这里是api请求名称
				apiGetSystemDetailListPage(para).then((res) => {
					//console.log(res.data);
					this.total = res.data.total;
					this.systemDetails = res.data.apiResponseSystemDetails;
					this.loading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				//console.log(row);
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { appname: row.appname };
					removeSystemDetail(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: 'delete success',
							type: 'success'
						});
						this.getSystemDetail();
					});
				}).catch(() => {
					console.log("click cancel buttom");
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				console.log("handleEdit.row:")
				console.log(row);
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示test按钮界面和设置界面默认值
			testButton: function () {
				this.testFormVisible = true;
				this.testForm = {
					testappname: '',
					testdescription: ''
				};
			},
			//显示新增界面和设置界面默认值
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					appname: '',
					tag: '',
					createdUser: '',
					createdTime: '',
					isBlock: 0,
					description: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							console.log(para);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editSystem(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getSystemDetail();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				//这里返回标签节点
				console.log("this.$refs.addForm:");
				console.log(this.$refs.addForm);
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						console.log("valid");
						console.log(valid);
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							console.log("addSubmit: function () - this.addForm:");
							console.log(this.addForm);
							let para = Object.assign({}, this.addForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addSystemDetail(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getSystemDetail();
							});
						}); // end this
					} // end if
				});
			},
			testSubmit: function () {
				this.$confirm('确认提交吗？', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
					}).then(() => {
					requestSuccess2().then((res) => {
						//console.log(res);
						//console.log(res.status);
						//console.log(res.data);
						//console.log(res.data.code);
						//实际页面显示的信息
						this.$message({
							message: 'test submit success',
							type: 'success'
						});
					});
					this.$refs['testForm'].resetFields();
					this.testFormVisible = false;
				});
			},
			selsChange: function (sels) {
				//console.log("selsChange");
				//console.log(sels);
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveSystem(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getSystemDetail();
					});
				}).catch(() => {
					console.log("batchRemove error");
				});
			}
		},
		mounted() {
			this.getSystemDetail();
		}
	}

</script>


<style scoped>

</style>
