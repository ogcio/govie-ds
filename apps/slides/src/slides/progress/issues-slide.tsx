import { Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { Slide } from "../../components/slide";
import { WorkItem, useWorkItems } from "./use-work-items";

type IssueProps = {
  title: string;
  tags: string;
};

function Issue({ title, tags }: IssueProps) {
  return (
    <div className="flex items-center justify-between gap-md border-xs border-gray-200 p-lg rounded shadow">
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <span
          className={clsx(
            "rounded px-md py-sm",
            tags === "DSv1" ? "bg-blue-100" : "bg-green-100"
          )}
        >
          {tags}
        </span>
      </div>
    </div>
  );
}

type IssuesProps = {
  title: string;
  issues: WorkItem[];
};

function Issues({ title, issues }: IssuesProps) {
  return (
    <div className="flex flex-col gap-lg">
      <h2 className="text-lg text-gray-700">{title}</h2>
      <div className="flex flex-col gap-md">
        {issues.map((issue) => (
          <Fragment key={issue.id}>
            <Issue title={issue.title} tags={issue.tags} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function sortByTags(a: WorkItem, b: WorkItem) {
  if (a.tags === "DSv2" && b.tags !== "DSv2") {
    return -1;
  }
  if (a.tags !== "DSv2" && b.tags === "DSv2") {
    return 1;
  }
  return 0;
}

// TODO: date lib
export function IssuesSlide() {
  const excludeComplete = ["Building Blocks - create Design System home page"];

  const {
    isError,
    isLoading,
    isSuccess,
    data: workItems,
  } = useWorkItems({
    query:
      "SELECT [System.Id] FROM workitemLinks WHERE ([Target].[System.State] = 'In Progress') AND ([Target].[System.WorkItemType] = 'User Story') AND ([Source].[System.Tags] Contains 'DSv1' OR [Source].[System.Tags] Contains 'Dsv2') MODE (DoesNotContain)",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>There was an error.</div>;
  }

  if (isSuccess) {
    const todoWorkItems = workItems
      .filter((item) => item.status === "todo")
      .slice(0, 10)
      .sort(sortByTags);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const endDate = new Date();

    // TODO: sort lib
    const inProgressWorkItems = workItems
      .filter((item) => item.status === "in-progress")
      .sort(sortByTags);

    const completeWorkItems = filterByDateRange({
      items: workItems.filter((item) => item.status === "development-complete"),
      startDate,
      endDate,
    })
      .filter((item) => excludeComplete.some((ex) => !ex.includes(item.title)))
      .sort(sortByTags);

    return (
      <Slide title="Issues">
        <div className="grid grid-cols-3 gap-xl">
          <Issues title="Complete" issues={completeWorkItems} />
          <Issues title="In Progress" issues={inProgressWorkItems} />
          <Issues title="Up Next" issues={todoWorkItems} />
        </div>
      </Slide>
    );
  }
}

function filterByDateRange({
  items,
  startDate,
  endDate,
}: {
  items: WorkItem[];
  startDate: Date;
  endDate: Date;
}) {
  return items.filter((item) => {
    return item.dateChanged >= startDate && item.dateChanged <= endDate;
  });
}
