/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import axios from "axios";

export type WorkItemStatus = "todo" | "in-progress" | "development-complete";

export type WorkItem = {
  id: string;
  priority: number;
  dateChanged: Date;
  status: WorkItemStatus;
  title: string;
  tags: string;
};

function toStatus(status: string): WorkItemStatus {
  switch (status) {
    case "Backlog":
    case "Ready to Play":
      return "todo";
    case "In Progress":
      return "in-progress";
    case "Ready to Release":
    case "Closed":
      return "development-complete";
    default:
      return "todo";
  }
}

export function useWorkItems({ query }: { query: string }) {
  const token = "";

  const organisation = "OGCIO-Digital-Services";
  const project = "Digital%20Services%20Programme";
  const team = "Design";

  return useQuery("issues", async () => {
    const response = await axios.post(
      `https://dev.azure.com/${organisation}/${project}/${team}/_apis/wit/wiql?api-version=5.1`,
      {
        query,
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch issues.");
    }

    // TODO: type
    const workItemIds: string[] = response.data.workItems.map(
      (workItem: any) => workItem.id
    );

    const workItemResponses = await Promise.allSettled(
      workItemIds.map((workItemId) => {
        return axios.get(
          `https://dev.azure.com/${organisation}/${project}/_apis/wit/workitems/${workItemId}?api-version=7.2-preview.3`,
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
      })
    );

    const azureWorkItems = workItemResponses
      .map((response) => {
        if (response.status === "fulfilled") {
          return response.value.data;
        }

        return null;
      })
      .filter(Boolean);

    const workItems: WorkItem[] = azureWorkItems.map((azureWorkItem: any) => {
      return {
        id: azureWorkItem.id,
        priority: azureWorkItem.fields["Microsoft.VSTS.Common.StackRank"],
        dateChanged: new Date(azureWorkItem.fields["System.ChangedDate"]),
        status: toStatus(azureWorkItem.fields["System.State"]),
        title: azureWorkItem.fields["System.Title"],
        tags: azureWorkItem.fields["System.Tags"],
      };
    });

    return workItems.sort((a, b) => a.priority - b.priority);
  });
}
