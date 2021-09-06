import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      duration="5000"
      position="top-right"
      containerStyle={{ top: 100 }}
      toastOptions={{
        style: {
          border: "1px solid darksteelblue",
          padding: "12px",
          color: "darksteelblue",
        },
      }}
    />
  );
}

export default Toast;