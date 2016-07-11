export default function reader(img) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (function() {
      resolve(reader.result);
    });
  });
}
