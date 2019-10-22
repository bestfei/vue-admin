import Mock from 'mockjs';

const MockDataSystemDetails = [];

for (let i = 0; i < 5; i++) {
  MockDataSystemDetails.push(Mock.mock({
    //在数组中随机找一个
    'appname|1':['be-app','be-kyc-biz','common-biz','coupon-biz','mpf-biz','ops-gw','sa-biz','trade-biz','trade-gw'],
    tag: 'dev_ph_'+Mock.Random.date('yyyyMMdd')+'_01',
    createdUser: Mock.mock('@email'),
    createdTime: Mock.Random.date(),
    isBlock: Mock.Random.integer(0, 1)
  }));
}

export { MockDataSystemDetails };
