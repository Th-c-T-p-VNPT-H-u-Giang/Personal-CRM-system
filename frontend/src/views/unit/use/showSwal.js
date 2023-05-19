import Swal from "sweetalert2";

export default function(){
    const showSuccess = () => {
        
        Swal.fire({
          title: "Success",
          icon: "success",
          confirmButtonText: "OK",
          showCloseButton: true,
        });
      };
      const showFail = () => {
        
        Swal.fire({
          title: "Thêm thành công",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
        });
      };
      return {showSuccess,showFail}
}