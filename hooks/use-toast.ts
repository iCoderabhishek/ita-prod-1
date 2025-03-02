'use client';

import * as React from 'react';
import { toast as sonnerToast, ToastT } from 'sonner';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToastProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

type ToastReturn = {
  id: string;
  dismiss: () => void;
  update: (props: ToastProps) => void;
};

let count = 0;
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function toast({ title, description, action }: ToastProps): ToastReturn {
  const id = genId();

  const update = (props: ToastProps) => sonnerToast(id, { ...props });
  const dismiss = () => sonnerToast.dismiss(id);

  sonnerToast(title, {
    description,
    action,
    id,
    duration: TOAST_REMOVE_DELAY,
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };
