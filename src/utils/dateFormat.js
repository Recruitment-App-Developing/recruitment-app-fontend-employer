export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const minute = date.getMinutes().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm 1 vì getMonth() trả về giá trị từ 0-11
    const day = date.getDate().toString().padStart(2, '0');
    return `${hour}:${minute} ${day}-${month}-${year}`;
};
