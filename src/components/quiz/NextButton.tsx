interface NextButtonProps {
  onNext: () => void;
}

export function NextButton({ onNext }: NextButtonProps) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-semibold hover:bg-indigo-app/90 transition-colors"
    >
      Next
    </button>
  );
}
