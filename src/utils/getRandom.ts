function getRandomInt(min: number, max: number) {
  min = Math.ceil(min) // 向上舍入到最近的整数，确保结果不小于最小值
  max = Math.floor(max) // 向下舍入到最近的整数，确保结果不大于最大值
  return Math.floor(Math.random() * (max - min + 1)) + min // 包括两个端点
}

export { getRandomInt }
