"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ExitConfirmDialogProps {
  onConfirm: () => void;
}

export function ExitConfirmDialog({ onConfirm }: ExitConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label="Leave session"
        className="min-w-[44px] min-h-[44px] rounded-btn flex items-center justify-center text-text-muted hover:text-text-body"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-bg-surface border border-border-subtle gap-3 p-4 max-w-[320px]">
        <div className="space-y-1 text-center">
          <AlertDialogTitle className="text-text-primary text-base font-medium">
            Leave this session?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-body text-sm">
            Progress will be lost. Are you sure?
          </AlertDialogDescription>
        </div>
        <div className="flex flex-col gap-2 mt-1">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full min-h-[44px] rounded-btn border border-wrong-bg text-red-700 bg-wrong-bg px-3 py-2 text-sm font-medium"
          >
            Yes, leave
          </button>
          <AlertDialogCancel
            variant="outline"
            className="w-full min-h-[44px] h-auto rounded-btn border border-border-subtle bg-bg-card px-3 py-2 text-sm font-medium text-text-body"
          >
            No, keep going
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
