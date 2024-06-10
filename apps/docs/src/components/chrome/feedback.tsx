import { config } from '@/lib/config';

export function Feedback() {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center gap-lg">
        <div className="bg-blue-600 px-md rounded text-white tracking-wider">
          Alpha
        </div>
        <p className="text-gray-700 text-xs sm:text-md">
          This is a new service - your{' '}
          <a
            className="underline text-blue-700 hover:decoration-md"
            href={config.feedbackFormUrl}
          >
            feedback
          </a>{' '}
          will help us to improve it.
        </p>
      </div>
      <hr />
    </div>
  );
}
