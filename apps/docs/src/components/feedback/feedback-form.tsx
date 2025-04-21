'use client';

import {
  FormField,
  ButtonGroup,
  ButtonGroupItem,
  Stack,
  Paragraph,
  Link,
} from '@govie-ds/react';
import analytics from '@/lib/analytics';
import { config } from '@/lib/config';
import { setFeedback, checkFeedbackWasGivenByPath } from '@/utils/feedback';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const SendFeedbackContainer = ({ onClick }: any) => {
  return (
    <Stack gap={4}>
      <Paragraph>You can tell us more bellow</Paragraph>
      <Link
        external
        onClick={onClick}
        asButton={{
          appearance: 'dark',
        }}
        href={config.feedbackFormUrl}
      >
        Send feedback
      </Link>
    </Stack>
  );
};

export default function FeedbackForm() {
  const [showForm, setShowForm] = useState(false);
  const [showSendFeedbackButton, setShowSendFeedbackButton] = useState(false);
  const routePath = usePathname();
  const lastPathRef = useRef(routePath);

  useEffect(() => {
    if (lastPathRef.current !== routePath) {
      setShowSendFeedbackButton(false);
      lastPathRef.current = routePath;
    }

    setShowForm(!checkFeedbackWasGivenByPath(routePath));
  }, [routePath]);

  const handleOnClick = (answer: string) => {
    setShowSendFeedbackButton(true);

    analytics.trackEvent({
      category: 'feedback',
      action: 'answer',
      name: answer,
      value: answer === 'yes' ? 1 : 0,
    });
  };

  const handleOnFeedbackFormButtonClick = () => {
    setShowForm(false);
    setFeedback(routePath);

    analytics.trackEvent({
      category: 'feedback',
      action: 'click',
      name: 'send_feedback',
    });
  };

  return showForm ? (
    <div className="border-sm border-solid w-105 p-4 bg-white fixed bottom-7 lg:right-14 right-6 z-900">
      <Stack>
        <FormField
          label={{
            text: 'Was this page helpful?',
          }}
          hint={{
            text: 'We use this feedback to improve our documentation',
          }}
        >
          {!showSendFeedbackButton && (
            <ButtonGroup name={'feedback_answer'} onChange={handleOnClick}>
              <ButtonGroupItem value="yes">Yes</ButtonGroupItem>
              <ButtonGroupItem value="no">No</ButtonGroupItem>
            </ButtonGroup>
          )}
        </FormField>
        {showSendFeedbackButton && (
          <SendFeedbackContainer onClick={handleOnFeedbackFormButtonClick} />
        )}
      </Stack>
    </div>
  ) : null;
  /*
    <Container className="w-full justify-end flex pb-8">
      <Stack className="border-sm border-solid w-full lg:w-105 p-4">
        <FormField
          label={{
            text: 'Was this page helpful?',
          }}
          hint={{
            text: 'We use this feedback to improve our documentation',
          }}
        >
          {!showSendFeedbackButton && (
            <ButtonGroup name={'feedback_answer'} onChange={handleOnClick}>
              <ButtonGroupItem value="yes">Yes</ButtonGroupItem>
              <ButtonGroupItem value="no">No</ButtonGroupItem>
            </ButtonGroup>
          )}
        </FormField>
          {showSendFeedbackButton && (
            <SendFeedbackContainer onClick={handleOnFeedbackFormButtonClick} />
          )}
      </Stack>
    </Container> */
}
