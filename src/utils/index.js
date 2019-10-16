import { navigate } from "@reach/router";

export const errorMiddleware = error => {
  navigate("/error", {
    state: { msg: error.response.data.msg, replace: true }
  });
};
