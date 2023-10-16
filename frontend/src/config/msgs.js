import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function defaultSuccess(payload = null) {
  const message = !payload ? "Operação realizada com sucesso!" : payload;

  toast.success(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function defaultError(payload = null) {
  const message = !payload ? "Oops... Erro inesperado" : payload;

  toast.error(message, {
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
  });
}

export default { defaultSuccess, defaultError };
