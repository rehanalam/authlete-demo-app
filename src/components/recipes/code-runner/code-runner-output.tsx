interface Props {
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: unknown;
}

export default function RunnerOutput({ isError, isSuccess, error, data }: Props) {
  if (!isError && !isSuccess) return null;

  return (
    <div className="p-4 bg-gray-50 overflow-y-auto max-h-48 border-t space-y-2">
      {isError && (
        <pre className="bg-red-100 text-red-800 p-3 rounded overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      {isSuccess && (
        <pre className="bg-green-100 text-green-800 p-3 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
