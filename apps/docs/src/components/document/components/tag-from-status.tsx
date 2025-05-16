import { ComponentStatus } from '@/lib/components';
import { TagTypeEnum } from '@govie-ds/react';

export function TagFromStatus(status: ComponentStatus) {
  switch (status) {
    case 'not-available': {
      return { text: 'N/A', type: TagTypeEnum.Default };
    }
    case 'considering': {
      return { text: 'Considering', type: TagTypeEnum.Default };
    }
    case 'alpha': {
      return { text: 'Alpha', type: TagTypeEnum.Warning };
    }
    case 'beta': {
      return { text: 'Beta', type: TagTypeEnum.Info };
    }
    case 'deprecated': {
      return { text: 'Deprecated', type: TagTypeEnum.Error };
    }
    case 'stable': {
      return { text: 'Stable', type: TagTypeEnum.Success };
    }
    default: {
      return { text: '', type: TagTypeEnum.Default };
    }
  }
}
