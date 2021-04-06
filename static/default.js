const WEB_SOCKET_HOST = 'http://#{HOST_IP}:9005/notification' //webSocket服务
const WEB_SOCKET_SEND_LIVE = '/app/sim-task/live/' //发送心跳/app/sim-task/live/{taskId}
const WEB_SOCKET_SEND_FINISH = '/sim-task/clear/' //发送主动停止/sim-task/clear/{taskId}
const WEB_SOCKET_GET_FRAMES = '/websocket/sim-data/' //接收帧数据/websocket/sim-data/{taskId}
const WEB_SOCKET_LIVE_CHECK_STEP = 1000 * 10 //心跳检查间隔  10秒一次 4次不发就超时

const DEV_CONFIG_STSTUS = false //指标体系开发者模式 true打开
const DEV_CONFIG__PUBLISH_BASE_STSTUS = false
const DEV_CONFIG__PUBLISH_OPERATOR_STSTUS = false
