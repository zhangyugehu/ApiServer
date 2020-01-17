/**
 * 创建一条消费或收入记录
 * 
 * @param {number} money 金额
 * @param {number} type 类型
 * @param {string}} category 分类
 * @param {string} date 日期
 * @param {string} categoty_sub 二级分类
 * @param {string} desp 描述
 * @param {string} pic 图片url
 */
function createRecord(money, type, category, date, { categoty_sub, desp, pic }={}) {
  return {money, type, category, date, categoty_sub, desp, pic };
}

module.exports = {
  createRecord
}
