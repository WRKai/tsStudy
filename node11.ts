import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const cur = 1724228152759
const time = dayjs(cur).fromNow()
console.log(time) // 1分钟前