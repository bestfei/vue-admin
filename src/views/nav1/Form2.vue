<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="用户名">
			<el-input v-model="form.accountname" name="accountname"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input v-model="form.loginpwd" name="loginpwd"></el-input>
		</el-form-item>
		<el-form-item label="性别">
			<el-radio-group v-model="form.gender">
				<el-radio label="男"></el-radio>
				<el-radio label="女"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="出生日期">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2" style="width:10px">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.birthdaytime" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="兴趣爱好">
			<el-checkbox-group v-model="form.hobby">
				<el-checkbox label="旅行" name="hobby"></el-checkbox>
				<el-checkbox label="阅读" name="hobby"></el-checkbox>
				<el-checkbox label="健身" name="hobby"></el-checkbox>
				<el-checkbox label="学习" name="hobby"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="活动区域">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="北京" value="beijing"></el-option>
				<el-option label="上海" value="shanghai"></el-option>
				<el-option label="广州" value="guangzhou"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="同意授权">
			<el-switch on-text="" off-text="" v-model="form.allow"></el-switch>
		</el-form-item>
		<el-form-item label="个人描述">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm">提交</el-button>
			<el-button @click="clearForm">取消</el-button>
		</el-form-item>
	</el-form>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					accountname: '',
					loginpwd: '',
					gender: '',
					birthday: '',
					birthdaytime: '',
					hobby: [],
					region: '',
					allow: false,
					desc: ''
				}
			}
		},
		methods: {
			submitForm: function () {
				console.log('submit!');
				console.log('accountname:'+this.form.accountname);
				console.log('loginpwd:'+this.form.loginpwd);
				console.log('gender:'+this.form.gender);
				console.log('birthday:'+this.form.birthday);
				console.log('birthdaytime:'+this.form.birthdaytime);
				console.log('hobby:'+this.form.hobby);
				console.log('region:'+this.form.region);
				console.log('allow:'+this.form.allow);
				console.log('desc:'+this.form.desc);
			},
			clearForm: function () {
				this.form.accountname='';
				this.form.loginpwd='';
				this.form.gender='';
				this.form.birthday='';
				this.form.birthdaytime='';
				this.form.hobby=[];
				this.form.region='';
				this.form.allow=false;
				this.form.desc='';
			}
		}
	}
</script>
