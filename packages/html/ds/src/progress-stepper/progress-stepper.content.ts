export const formSlot1 = `
<div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-2 gi-flex-nowrap" role="region" style="height: 100%;">
   <h1 class="gi-heading-sm gi-heading-xl" data-testid="govie-stack-item-0">Category Details</h1>
   <p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">Please select the options that best describes the query you’re raising.</p>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div><label class="gi-text-md gi-label gi-font-bold">Category</label></div>
      </div>
      <select class="gi-select" aria-label="Select Category">
         <option class="gi-select-option" aria-selected="false" value="0">Select a Category</option>
      </select>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div><label class="gi-text-md gi-label gi-font-bold">Customer Type</label></div>
      </div>
      <select class="gi-select" aria-label="Select Customer Type">
         <option class="gi-select-option" aria-selected="false" value="0">Select a Customer Type</option>
      </select>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div><label class="gi-text-md gi-label gi-font-bold">Related Topic</label></div>
      </div>
      <select class="gi-select" aria-label="Select Related Topic">
         <option class="gi-select-option" aria-selected="false" value="0">Select a related topic</option>
      </select>
   </fieldset>
</div>`;

export const formSlot2 = `
<div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-2 gi-flex-nowrap" role="region" style="height: 100%;">
   <h1 class="gi-heading-sm gi-heading-xl" data-testid="govie-stack-item-0">Query Details</h1>
   <p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">If this query is about someone else, please provide their details below. If it's about yourself, enter your own details.</p>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div><label class="gi-text-md gi-label gi-font-bold" for="fullname-text-id">Full name</label></div>
      </div>
      <div class="gi-input-text-container">
         <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" id="fullname-text-id" type="text"></div>
      </div>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div><label class="gi-text-md gi-label gi-font-bold" for="pps-number-text-id">PPS Number</label></div>
      </div>
      <div class="gi-input-text-container">
         <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" id="pps-number-text-id" type="text"></div>
      </div>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div>
            <label class="gi-text-md gi-label gi-font-bold" for="school-roll-number-text-id">School Roll Number</label>
            <div class="gi-hint-text-md gi-hint-text gi-mb-1">Don't know your school number? Find a school application.</div>
         </div>
      </div>
      <div class="gi-input-text-container">
         <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" id="school-roll-number-text-id" type="text"></div>
      </div>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div>
            <label class="gi-text-md gi-label gi-font-bold" for="description-text-id">Describe your Query</label>
            <div class="gi-hint-text-md gi-hint-text gi-mb-1">(Max 1'000 words)</div>
         </div>
      </div>
      <div class="gi-textarea-container">
         <div class="gi-textarea-inner"><textarea rows="4" cols="100" autocomplete="on" class="gi-textarea" data-icon-start="false" id="description-text-id"></textarea></div>
      </div>
   </fieldset>
   <fieldset class="">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div>
            <label class="gi-text-md gi-label gi-font-bold" for="file-upload-id">Document Upload</label>
            <div class="gi-hint-text-md gi-hint-text gi-mb-1">.jpg, .rtf, .txt, .doc,. docx and .pdf files are accepted. Looking for an application form? Find a form here.</div>
         </div>
      </div>
      <input accept="*/*" id="file-upload-id" class="gi-input-file" multiple="" type="file">
   </fieldset>
</div>
`;

export const formSlot3 = `
<div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-2 gi-flex-nowrap" role="region" style="height: 100%;">
   <h1 class="gi-heading-sm gi-heading-xl" data-testid="govie-stack-item-0">Contact Details</h1>
   <p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">Where should we send updates about this query? Enter your contact details or the details of someone else who should receive the updates.</p>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div>
            <label class="gi-text-md gi-label gi-font-bold" for="contact-fullname-text-id">Full name</label>
            <div class="gi-hint-text-md gi-hint-text gi-mb-1">(to be used for communications relating to this query)</div>
         </div>
      </div>
      <div class="gi-input-text-container">
         <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" id="contact-fullname-text-id" type="text"></div>
      </div>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div>
            <label class="gi-text-md gi-label gi-font-bold" for="phone-number-text-id">Phone Number Number</label>
            <div class="gi-hint-text-md gi-hint-text gi-mb-1">(to be used for communications relating to this query)</div>
         </div>
      </div>
      <div class="gi-input-text-container">
         <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" id="phone-number-text-id" type="text"></div>
      </div>
   </fieldset>
   <fieldset class="lg:gi-w-[450px] gi-w-full">
      <div class="gi-pb-3 gi-flex gi-flex-col gi-gap-1">
         <div>
            <label class="gi-text-md gi-label gi-font-bold" for="email-text-id">Email Address</label>
            <div class="gi-hint-text-md gi-hint-text gi-mb-1">(to be used for communications relating to this query)</div>
         </div>
      </div>
      <div class="gi-input-text-container">
         <div class="gi-input-text-inner"><input data-icon-start="false" data-icon-end="false" data-end-element="false" data-prefix="false" data-suffix="false" class="gi-input-text" id="email-number-text-id" type="text"></div>
      </div>
   </fieldset>
</div>
`;
