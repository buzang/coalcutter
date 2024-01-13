import { message } from 'antd'
import { MessageCenter } from 'nikel-message-center'

/**
 * @description: WS客户端类
 */
export class WebSocketClient {
  // 用于控制项目只有一个实例
  private static _webSocketClient: WebSocketClient

  /**
   * @description: 执行重连定时器
   */
  private _reconnectTimer: number = 0

  private static _webSocket: WebSocket

  private static _userid: number = 0

  private static _community: string = ''
  // 服务器地址
  private get _servePath(): string {
    return `ws://127.0.0.1:8082/api/chat/${WebSocketClient._community}/${WebSocketClient._userid}`
  }

  private constructor() {
    message.config({
      maxCount: 2,
      duration: 1.5,
      top: 55,
    })
    WebSocketClient._webSocket = new WebSocket(this._servePath)
    WebSocketClient._webSocket.onopen = this._handleConnectSuccessCallback // 与服务器成功连接的响应
    WebSocketClient._webSocket.onerror = this._handleConnectErrorCallback // 服务器连接过程中发生错误的响应
    WebSocketClient._webSocket.onclose = this._handleCloseConnectCallback // 与服务器断开连接的响应
    WebSocketClient._webSocket.onmessage = this._handleGetAMessageCallback // 接收到服务器端消息的响应
  }

  /**
   * @description: 返回连接状态信息
   */
  public static get ConnectionStatus(): { state: number } {
    return {
      state: this._webSocket.readyState,
    }
  }

  /**
   * @description: 初始化websocket
   */
  public static Init(community: string, userId: number) {
    this._userid = userId
    this._community = community
    if (!typeof WebSocketClient)
      message.error('本项目不支持当前浏览器，请使用支持新特性的Chrome或Edge浏览器')

    else if (this._webSocketClient == null)
      return new WebSocketClient()
  }

  /**
   * @description: 向服务器发送查询命令
   * @param requestStr 请求指令
   */
  public static SendQueryOrdered = (community: string, requestStr: string, time: string): any => {
    const message = {
      userId: JSON.parse(localStorage.getItem('UserInfo')!).id,
      community,
      time,
      content: requestStr,
    }

    this._webSocket.send(JSON.stringify(message))
  }

  public static Close() {
    this._webSocket.close()
  }

  // #region WebSocket 响应事件
  /**
   * @description: “打开服务器连接”的响应方法
   */
  private _handleConnectSuccessCallback = (): void => {
    message.success('连接社区服务器成功 ✅')
  }

  /**
   * @description: “与服务器连接时发生错误时”的响应方法
   */
  private _handleConnectErrorCallback(_error: any): void {
    message.error('服务器连接失败，请检查服务器是否开启')
    // WebSocketClient._webSocket = new WebSocket(this._servePath)
  }

  /**
   * @description: “关闭与服务器连接时”的响应方法
   */
  private _handleCloseConnectCallback = (): void => {
    // 销毁WS连接
    WebSocketClient._webSocket.close()
    message.info(' 已离开社区服务器 🔗')
  }

  /**
   * @description: “接受到服务器端消息时”的响应方法
   */
  private _handleGetAMessageCallback = (msg: any): void => {
    let data: string = ''
    if (msg.data.includes('{') && msg.data.includes('}'))
      data = JSON.parse(msg.data)
    else
      data = msg.data

    MessageCenter.Publish('Message', data)
  }

  // #endregion
}
