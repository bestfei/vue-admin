import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://upload.jianshu.io/users/upload_avatars/4225600/ff25ebebd273?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
    name: 'Best Fei'
  }
];


const Users = [];
for (let i = 0; i < 88; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
