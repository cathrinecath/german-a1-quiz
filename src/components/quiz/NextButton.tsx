interface NextButtonProps {
  onNext: () => void;
}

export function NextButton({ onNext }: NextButtonProps) {
  return (
    <button
      data-stub="NextButton"
      onClick={onNext}
      className="w-full bg-indigo-app text-white rounded-btn min-h-[44px] py-2 text-sm font-medium"
    >
      Next
    </button>
  );
}
