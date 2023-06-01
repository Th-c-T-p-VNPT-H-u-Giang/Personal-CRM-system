import Swal from "sweetalert2";

export default function () {
  const showSuccess = () => {
    Swal.fire({
<<<<<<< HEAD
      title: "Thành công",
=======
      title: "Success",
>>>>>>> master
      icon: "success",
      confirmButtonText: "OK",
      showCloseButton: true,
    });
  };
  const showDelete = () => {
    Swal.fire({
<<<<<<< HEAD
      title: "Bạn có muốn xóa?",
=======
      title: "Do you want to delete the level?",
>>>>>>> master
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#cc0000",
      // denyButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
      }
    });
  };
  return { showSuccess, showDelete };
}
