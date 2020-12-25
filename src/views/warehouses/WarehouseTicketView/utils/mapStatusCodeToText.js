export default function(statusCode) {
  switch (Number(statusCode)) {
    case 0:
      return 'Đang xử lý';
    case 1:
      return 'Đã hủy';
    case 2:
      return 'Hoàn thành';
  }
}
