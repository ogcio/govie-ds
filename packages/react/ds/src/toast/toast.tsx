import 'notyf/notyf.min.css';
import { useContext, useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Alert } from '../alert/alert.js';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import toastConfig from './toast-context.js';

// type Props = {}

export const Toast = () => {
  const notyf = useContext(toastConfig);
  const [withTrigger, setWithTrigger] = useState(false);
  const html = renderToString(
    <Alert title="Info Alert">
      <Paragraph>This is the content</Paragraph>
    </Alert>,
  );

  useEffect(() => {
    if (!withTrigger) {
      notyf.open({ type: 'test', message: html });
    }
  }, []);

  if (!withTrigger) {
    return null;
  }
  return (
    <Button onClick={() => notyf.success('THIS IS A SUCCESS TOAST')}>
      Toast
    </Button>
  );
};

export default Toast;
