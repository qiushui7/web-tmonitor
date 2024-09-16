export function generateUniqueId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

export function deepClone(obj) {
  // 处理基础数据类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 创建数组或对象
  const clone = Array.isArray(obj) ? [] : {};

  // 遍历对象或数组的所有属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归深拷贝每一个属性值
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

export function isSafari() {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}
