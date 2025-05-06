export enum Command {
  goForward = 1, // 前进
  goBack = 2, // 后退
  goLeft = 3, // 向左变轨
  goRight = 4, // 向右变轨
  manualModel = 5, // 手动模式
  autoModel = 6, // 自动模式
  noLashed = 7, // 不扎
  allLashed = 8, // 满扎
  jumpLashed = 9, // 跳扎
  lashedReboot = 10, // 绑扎抢重启
  machineReboot = 11, // 机器人复位
  machineDescent = 12, // 机器人下降
  softStop = 13, // 软急停
  release = 14, // 释放前后移动按钮
  loginSuccess = 15, // 登录成功命令
}
