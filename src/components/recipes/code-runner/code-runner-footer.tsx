interface Props {
  prevStepId: string | null;
  isPending: boolean;
  onExecute: () => void;
  onBack: () => void;
}

export default function RunnerFooter({ prevStepId, onExecute, onBack, isPending }: Props) {
  return (
    <div className="flex justify-between p-4 border-t bg-white">
      <button
        onClick={onBack}
        disabled={!prevStepId}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Back
      </button>

      <button
        onClick={onExecute}
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isPending ? "Running…" : "Execute"}
      </button>
    </div>
  );
}
