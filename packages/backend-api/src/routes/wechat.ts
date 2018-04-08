import * as Router from 'koa-router';
import config from '../config';
import { cryptoHelper } from '../utils';

const router = new Router({
  prefix: ``
});

/**
 * 微信接口配置，验证。
 */
router.get('/', async ctx => {
  const { query } = ctx;
  // 需要将微信Token, timestamp, nonce 转换为数组，进行字典序排序后，通过sha1计算得出签名
  const text = [config.wxToken, query.timestamp, query.nonce].sort().join('');
  const signature = cryptoHelper.sha1(text);
  // 通过签名
  if (signature === query.signature) {
    ctx.body = query.echostr;
  } else {
    // 不通过签名
    ctx.body = { code: -1, msg: 'fail' };
  }
});

module.exports = { router };
