import { Fragment } from "react/jsx-runtime";

export type TimelineItem = {
  title: string;
  date?: string;
  description: string;
};

function TimelineItem({ title, date, description }: TimelineItem) {
  return (
    <li className="relative mb-xl sm:mb-0">
      <div className="flex items-center">
        <div className="z-10 flex items-center justify-center w-[32px] h-[32px] bg-blue-300 rounded-full ring-0 ring-white shrink-0">
          <svg
            className="w-[12px] h-[12px] text-blue-50"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <div className="hidden sm:flex w-full bg-blue-300 h-[0.5px]"></div>
      </div>
      <div className="flex flex-col gap-sm py-md">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {date ? (
          <time className="block mb-md text-sm font-normal leading-none text-gray-400">
            {date}
          </time>
        ) : null}
        <p className="text-md font-normal text-gray-500">{description}</p>
      </div>
    </li>
  );
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="grid grid-cols-3 gap-lg">
      {items.map((item, index) => (
        <Fragment key={index}>
          <TimelineItem {...item} />
        </Fragment>
      ))}
    </ol>
  );
}
