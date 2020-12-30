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
