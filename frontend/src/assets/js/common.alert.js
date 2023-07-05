import Swal from "sweetalert2";

export const alert_success = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_warning = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_error = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_info = (title, text) => {
  Swal.fire({
    icon: "info",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

// alert response

export const alert_delete = async (title, text) => {
  let isConfirmed = false;
  await Swal.fire({
    icon: "question",
    title: title,
    html: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
    showCancelButton: true,
    showConfirmButton: true,
    reverseButtons: true,
  }).then((result) => {
    isConfirmed = result.isConfirmed;
  });
  return isConfirmed;
};

export const alert_delete_wide = async (title, text) => {
  let isConfirmed = false;
  await Swal.fire({
    icon: "question",
    title: title,
    html: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
    showCancelButton: true,
    showConfirmButton: true,
    reverseButtons: true,
    customClass: {
      container: "wide-dialog-container",
      popup: "wide-dialog-popup",
      content: "wide-dialog-content",
    },
  }).then((result) => {
    isConfirmed = result.isConfirmed;
  });
  return isConfirmed;
};

//notification
export const alert_noti = (title, text) => {
  const formattedText = text.replace(/\n/g, "<br>");
  Swal.fire({
    icon: "info",
    title: title,
    html: `<div style="line-height:30px;text-align:center;">${formattedText}</div>`,
    background: "#fff",
    width: 700,
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_input_text = async (title) => {
  let content = "";
  await Swal.fire({
    title: title,
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Thêm",
    preConfirm: (inputValue) => {
      if (inputValue.trim() === "") {
        Swal.showValidationMessage("Vui lòng nhập đủ thông tin.");
      }
      return inputValue;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      content = result.value;
    }
  });
  return content;
};
//mail
export const alert_mail = () => {
  Swal.fire({
    title: "Gửi Email",
    html: `
      <div style="text-align:justify">
      <div class="container">
        <div class="form-group">
          <label for="subject">Tiêu Đề(<span style="color: red">*</span>):</label>
          <input type="text" id="subject" class="form-control">
        </div>
        <div class="form-group">
          <label for="content">Nội Dung(<span style="color: red">*</span>):</label>
          <textarea id="content" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="attachment">Tệp Đính Kèm(<span style="color: red">*</span>):</label>
          <input type="file" id="attachment" multiple class="form-control">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Send",
    showLoaderOnConfirm: true,
    width:700,
    preConfirm: () => {
      const recipient = document.getElementById("recipient").value;
      const subject = document.getElementById("subject").value;
      const content = document.getElementById("content").value;
      const fileInput = document.getElementById("attachment");
      const attachment = fileInput.files.length > 0 ? fileInput.files[0] : null;

      const formData = new FormData();
      formData.append("recipient", recipient);
      formData.append("subject", subject);
      formData.append("content", content);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      return fetch("/send-mail", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Email Sent",
        text: "The email has been sent successfully.",
        icon: "success",
      });
    }
  });
};
