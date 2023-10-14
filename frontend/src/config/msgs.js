import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function defaultSuccess(payload) {
  const message = !payload.msg
    ? "Operação realizada com sucesso!"
    : payload.msg;

  toast.success(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function defaultError(payload) {
  const message = !payload.msg ? "Oops... Erro inesperado" : payload.msg;

  toast.error(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
}

export default { defaultSuccess, defaultError };
