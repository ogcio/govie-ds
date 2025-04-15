export type DocumentSiteConfiguration = {
  showDrafts: boolean;
  feedbackFormUrl: string;
  signUpFormUrl: string;
};

export const config: DocumentSiteConfiguration = {
  showDrafts: process.env.SHOW_DRAFTS === 'true',
  feedbackFormUrl: process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL || '',
  signUpFormUrl: process.env.NEXT_PUBLIC_SIGNUP_FORM_URL || '',
};
