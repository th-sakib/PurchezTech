import Swal from "sweetalert2";

export const toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    // toast.onmouseenter = Swal.stopTimer;
    // toast.onmouseleave = Swal.resumeTimer;
  },
});
