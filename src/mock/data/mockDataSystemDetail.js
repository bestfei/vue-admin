import Mock from 'mockjs';

const SystemDetails = [];

for (let i = 0; i < 5; i++) {
  SystemDetails.push(Mock.mock({
    name: Mock.Random.cname(),
    tag: 'dev_ph_20191122_01',
    createdTime: Mock.Random.date(),
    isBlock: Mock.Random.integer(0, 1)
  }));
}

export { SystemDetails };
