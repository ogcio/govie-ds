'use client';

import {
  ButtonGroup,
  ButtonGroupItem,
  Stack,
  Link,
  Container,
  Heading,
} from '@govie-ds/react';
import analytics from '@/lib/analytics';
import { config } from '@/lib/config';
import { useState } from 'react';

export default function FeedbackForm() {
  const [showSendFeedbackButton, setShowSendFeedbackButton] = useState(false);

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
    setShowSendFeedbackButton(false);
    analytics.trackEvent({
      category: 'feedback',
      action: 'click',
      name: 'send_feedback',
    });
  };

  return (
    <Container>
      <Stack
        itemsAlignment="center"
        gap={4}
        direction="row"
        className="mb-4"
        role="group"
        aria-labelledby="feedback-heading"
      >
        <Heading as="h5" id="feedback-heading">
          Was this page helpful?
        </Heading>
        <div>
          {showSendFeedbackButton ? (
            <Link
              aria-label="feedback external link"
              external
              onClick={handleOnFeedbackFormButtonClick}
              asButton={{
                appearance: 'dark',
              }}
              href={config.feedbackFormUrl}
            >
              Send feedback
            </Link>
          ) : (
            <ButtonGroup
              role="radiogroup"
              aria-labelledby="feedback-heading"
              name="feedback_answer"
              onChange={handleOnClick}
            >
              <ButtonGroupItem value="yes" aria-label="Yes">
                Yes
              </ButtonGroupItem>
              <ButtonGroupItem value="no" aria-label="No">
                No
              </ButtonGroupItem>
            </ButtonGroup>
          )}
        </div>
      </Stack>
    </Container>
  );
}
