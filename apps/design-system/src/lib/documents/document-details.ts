export function getSegmentDetails(segment: string) {
  const segmentParts = segment.match(/^(\d+)-(.*)/);

  if (!segmentParts || segmentParts.length < 3) {
    throw new Error(`Invalid segment '${segment}'.`);
  }

  return { id: segmentParts[2], order: Number(segmentParts[1]) };
}

export function getDocumentDetails(path: string) {
  if (!path) {
    throw new Error(`Invalid path '${path}'.`);
  }

  const pathParts = path.split("/").map((part) => getSegmentDetails(part));

  if (pathParts.length < 2 || pathParts.length > 3) {
    throw new Error(`Invalid path '${path}'.`);
  }

  return {
    id: path,
    order: pathParts.length === 2 ? pathParts[1].order : pathParts[2].order,
    slug:
      pathParts.length === 2
        ? pathParts[1].id === "index"
          ? pathParts[0].id
          : `${pathParts[0].id}/${pathParts[1].id}`
        : pathParts[2].id === "index"
          ? pathParts[0].id
          : `${pathParts[0].id}/${pathParts[2].id}`,
  };
}
