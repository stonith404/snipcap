import * as RadixToast from "@radix-ui/react-toast";
import * as React from "react";
import { create } from "zustand";

type ToastState = {
  message: string;
  type: "success" | "error";
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  close: () => void;
};

export const useToast = create<ToastState>((set) => ({
  message: "",
  type: "success",
  showSuccess: (message: string) => {
    set({ message, type: "success" });
  },
  showError: (message: string) => {
    set({ message, type: "error" });
  },
  close: () => {
    set({ message: "" });
  },
}));

export default function Toast() {
  const toast = useToast();

  React.useEffect(() => {
    if (toast.message) {
      const timeout = setTimeout(() => {
        toast.close();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [toast.message]);

  return (
    <RadixToast.Provider swipeDirection="right">
      <RadixToast.Root
        className="bg-foreground rounded-full flex justify-center py-3 px-5 items-center"
        open={toast.message !== ""}
      >
        <RadixToast.Title className="mr-3">
          {toast.type === "success" ? "✅" : "❌"}
        </RadixToast.Title>
        <RadixToast.Description asChild>
          <p className="text-sm">{toast.message}</p>
        </RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-16 left-1/2 transform -translate-x-1/2" />
    </RadixToast.Provider>
  );
}
