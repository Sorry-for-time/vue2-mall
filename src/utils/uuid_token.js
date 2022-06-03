/**
 * @description 获取/设置 uuid
 * @param {*} start uuid 截取位置起始值
 * @param {*} end uuid 截取位置结束值
 * @returns {string} uuid
 */
export const getOrSetUUID = (tokenName, start = 0, end = 36) => {
  const userUUID = localStorage.getItem(tokenName);
  return userUUID
    ? userUUID
    : (() => {
        const newUUID = window.crypto.randomUUID().substring(start, end);
        localStorage.setItem(tokenName, newUUID);
        return newUUID;
      })();
};
