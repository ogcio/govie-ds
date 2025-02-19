export type DocumentSiteConfiguration = {
  showDrafts: boolean;
  baseUrl: string;
  feedbackFormUrl: string;
  signUpFormUrl: string;
};

export const config: DocumentSiteConfiguration = {
  showDrafts: process.env.SHOW_DRAFTS === 'true',
  baseUrl: process.env.BASE_URL || '',
  feedbackFormUrl: process.env.FEEDBACK_FORM_URL || '',
  signUpFormUrl: process.env.SIGNUP_FORM_URL || '',
};
