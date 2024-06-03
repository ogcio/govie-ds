function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export const config = {
  isProduction: () => isProduction(),
  showDrafts: () => {
    // Show drafts setting takes precedence
    if (process.env.SHOW_DRAFTS) {
      return process.env.SHOW_DRAFTS === 'true';
    }

    return !isProduction();
  },
  buildingBlocksHomeUrl: 'https://dev.blocks.gov.ie/en/',
  feedbackFormUrl:
    'https://www.formsg.testing.gov.ie/en/664c61ba5f7c9800231db294',
  signUpFormUrl:
    'https://www.formsg.testing.gov.ie/en/664b6de45f7c9800231daf22',
};
