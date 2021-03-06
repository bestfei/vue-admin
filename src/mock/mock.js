import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
//引入mock data js
import { MockDataSystemDetails } from './data/mockDataSystemDetail';
let _Users = Users;
let _SystemDetails = MockDataSystemDetails;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取系统列表（分页）
    mock.onGet('/system/listpage').reply(config => {
      let {page, name} = config.params;
      let mockSystemDetails = _SystemDetails.filter(systemDetails => {
        if (name && systemDetails.appname.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockSystemDetails.length;
      mockSystemDetails = mockSystemDetails.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            apiResponseSystemDetails: mockSystemDetails
          }]);
        }, 1000);
      });
    });

    //获取系统列表
    mock.onGet('/system/list').reply(config => {
      let {name} = config.params;
      //筛选功能 自定义变量systemDetails11
      let mockSystemDetails = _SystemDetails.filter(systemDetails11 => {
        //根据mock返回体的appname字段筛选
        if (name && systemDetails11.appname.indexOf(name) == -1) return false;
        return true;
      });

      //如果不需要筛选功能
      //let mockSystemDetails = _SystemDetails

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            //  把mock结果放入接口返回 apiResponseSystemDetails节点
            apiResponseSystemDetails: mockSystemDetails
          }]);
        }, 1000);
      });
    });

    //删除系统
    mock.onGet('/system/remove').reply(config => {
      let { appname } = config.params;
      _SystemDetails = _SystemDetails.filter(u => u.appname !== appname);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'delete success'
          }]);
        }, 500);
      });
    });

    //批量删除系统
    mock.onGet('/system/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _SystemDetails = _SystemDetails.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    // mock 成功页面
    mock.onGet('/success2').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'api response success'
          }]);
        }, 500);
      });
    });

    //新增系统
    mock.onGet('/system/add').reply(config => {
      let { appname, tag, createdUser, createdTime, isBlock, description } = config.params;
      _SystemDetails.push({
        appname: appname,
        tag: tag,
        createdUser: createdUser,
        createdTime: createdTime,
        isBlock: isBlock,
        description: description
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });


    //编辑系统
    mock.onGet('/system/edit').reply(config => {
      let { id, appname, tag, createdUser, createdTime, isBlock, description } = config.params;
      _SystemDetails.some(u => {
        if (u.id === id) {
            //console.log("appname:"+appname);
            u.appname = appname;
            u.tag = tag;
            u.createdUser = createdUser;
            u.createdTime = createdTime;
            u.isBlock = isBlock;
            u.description = description;
            return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });


    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      //console.log(mockUsers);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      console.log(config.params);
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};
