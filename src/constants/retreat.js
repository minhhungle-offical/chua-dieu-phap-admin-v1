export const retreatOption = [
  { label: "Bát quan trai", value: "bqt" },
  { label: "Phật thất", value: "phat-that" },
  { label: "Thiền", value: "thien" },
  { label: "Khóa hè", value: "summer" },
  { label: "Gieo duyên", value: "gieo-duyen" },
  { label: "Học pháp", value: "hoc-phap" },
  { label: "Khác", value: "khac" },
];

export const retreatTypeMap = {
  bqt: "Bát quan trai",
  "phat-that": "Phật Thất",
  thien: "Thiền",
  summer: "Khóa Hè",
  "gieo-duyen": "Gieo Duyên",
  "hoc-phap": "Học Pháp",
  khac: "Khác",
};

export const statusOptions = [
  { label: "Bản nháp", value: "draft" },
  { label: "Đã xuất bản", value: "published" },
  { label: "Đã lưu trữ", value: "archived" },
];

export const mockRetreats = [
  {
    _id: "retreat1",
    name: "Khóa tu mùa hè 2024",
    description:
      "Khóa tu dành cho thanh thiếu niên, rèn luyện đạo đức, kỹ năng sống và thiền tập cơ bản.",
    type: "summer",
    status: "published",
    startDate: "2024-06-10",
    endDate: "2024-06-15",
    startTime: "08:00",
    endTime: "17:00",
    location: "Chùa Diệu Pháp",
    capacity: 150,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat2",
    name: "Phật Thất đầu năm",
    description:
      "Khóa tu Phật Thất nhằm khởi đầu một năm mới an lành, bình an và tịnh tâm.",
    type: "phat-that",
    status: "draft",
    startDate: "2025-02-05",
    endDate: "2025-02-11",
    startTime: "06:30",
    endTime: "20:00",
    location: "Chùa Giác Ngộ",
    capacity: 200,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat3",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat4",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat5",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat6",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat7",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat8",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
  {
    _id: "retreat9",
    name: "Khóa thiền Vipassana",
    description:
      "7 ngày thực hành thiền Vipassana truyền thống, giữ im lặng tuyệt đối và chánh niệm sâu sắc.",
    type: "thien",
    status: "archived",
    startDate: "2023-11-01",
    endDate: "2023-11-07",
    startTime: "04:00",
    endTime: "21:00",
    location: "Tu viện Tịnh Tâm",
    capacity: 80,
    imageUrl:
      "https://res.cloudinary.com/dea5jhokr/image/upload/v1749110058/chua-dieu-phap/1749110056662-M%C3%A1%C2%BB%C2%9CI%20THAM%20D%C3%A1%C2%BB%C2%B0%20L%C3%A1%C2%BA%C2%A6N%204_1.jpg",
  },
];
