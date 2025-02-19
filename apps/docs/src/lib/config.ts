export type DocumentSiteConfiguration = {
  showDrafts: boolean;
  feedbackFormUrl: string;
  signUpFormUrl: string;
};

export const config: DocumentSiteConfiguration = {
  showDrafts: process.env.SHOW_DRAFTS === 'true',
  feedbackFormUrl: process.env.FEEDBACK_FORM_URL || '',
  signUpFormUrl: process.env.SIGN_UP_FORM_URL || '',
};
