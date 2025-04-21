export function getFeedbacks(): string[] {
  try {
    if (typeof window === 'undefined') {
      return [];
    }

    const feedbackWasGiven = localStorage.getItem('feedbackStatus') as string;
    return feedbackWasGiven ? JSON.parse(feedbackWasGiven) : [];
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}

export function checkFeedbackWasGivenByPath(path: string) {
  const feedbacks = getFeedbacks();
  return feedbacks.includes(path);
}

export function setFeedback(path: string) {
  const feedbacks = getFeedbacks();
  feedbacks.push(path);
  localStorage.setItem('feedbackStatus', JSON.stringify(feedbacks));
}
