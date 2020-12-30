import FiberNewIcon from '@material-ui/icons/FiberNew';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import TimerIcon from '@material-ui/icons/Timer';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export default function(statusCode) {
  switch (Number(statusCode)) {
    case 0:
      return 'Đơn mới';
    case 1:
      return 'Khách hàng đã xác nhận';
    case 2:
      return 'Đã xác nhận';
    case 3:
      return 'Khách hàng huỷ đơn';
    case 4:
      return 'Đang đóng gói';
    case 5:
      return 'Đang đợi vận chuyển';
    case 6:
      return 'Đã gửi vận chuyển';
    case 7:
      return 'Đang giao';
    case 8:
      return 'Đã giao';
    case 9:
      return 'Khách hoàn trả';
    case 10:
      return 'Đơn bị huỷ';
  }
}

export const toTimeLine = statusCode => {
  switch (Number(statusCode)) {
    case 0:
      return {
        label: 'Đơn mới',
        Icon: FiberNewIcon,
        backgroundColor: '#e74c3c'
      };
    case 1:
      return {
        label: 'Khách hàng đã xác nhận',
        Icon: ContactPhoneIcon,
        backgroundColor: '#2980b9'
      };
    case 2:
      return {
        label: 'Đã xác nhận',
        Icon: VerifiedUserIcon,
        backgroundColor: '#27ae60'
      };
    case 3:
      return {
        label: 'Khách hàng huỷ đơn',
        Icon: CancelPresentationIcon,
        backgroundColor: '#34495e'
      };
    case 4:
      return {
        label: 'Đang đóng gói',
        Icon: CardGiftcardIcon,
        backgroundColor: '#f39c12'
      };
    case 5:
      return {
        label: 'Đang đợi vận chuyển',
        Icon: TimerIcon,
        backgroundColor: '#9b59b6'
      };
    case 6:
      return {
        label: 'Đã gửi vận chuyển',
        Icon: ExitToAppIcon,
        backgroundColor: '#2ecc71'
      };
    case 7:
      return {
        label: 'Đang giao',
        Icon: LocalShippingIcon,
        backgroundColor: '#2ecc71'
      };
    case 8:
      return {
        label: 'Đã giao',
        Icon: ThumbUpIcon,
        backgroundColor: '#27ae60'
      };
    case 9:
      return {
        label: 'Khách hoàn trả',
        Icon: KeyboardReturnIcon,
        backgroundColor: '#95a5a6'
      };
    case 10:
      return {
        label: 'Đơn bị huỷ',
        Icon: SentimentVeryDissatisfiedIcon,
        backgroundColor: '#2c3e50'
      };
  }
};
