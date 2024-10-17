import {
    BaseComponent,
    BaseComponentOptions,
    initialiseModule,
  } from '../common/component';
  
  export type TextareaProps = BaseComponentOptions;
  
  export class Textarea extends BaseComponent<TextareaProps> {
    calculateRemainingChars: () => void;
    getAllTextarea: NodeListOf<HTMLTextAreaElement>;

    constructor(options: TextareaProps) {
      super(options);
      this.getAllTextarea = document.querySelectorAll('textarea')
       
      this.calculateRemainingChars = () => {
        for (const textarea of this.getAllTextarea) {
        const {id, value, maxLength} = textarea
        const remainingCharsContainer = document.querySelector(`div[data-remaining-chars-container=${id}]`)
        
        if(textarea?.maxLength > -1 && remainingCharsContainer){
          const container = remainingCharsContainer.firstElementChild
          if(container){
            container.innerHTML = `You have ${(maxLength - value.length)} characters remaining`;   
          }
        }
      };
    }
  }
  
    initComponent() {
      for (const textarea of this.getAllTextarea) {
        textarea.addEventListener('input', this.calculateRemainingChars, false);
      }
    }
    destroyComponent(): void {
      for (const textarea of this.getAllTextarea) {
        textarea.removeEventListener('input', this.calculateRemainingChars, false);
      }
    }
  }
  
  export const initTextarea = initialiseModule({
    name: 'textarea',
    component: 'Textarea',
  });
  