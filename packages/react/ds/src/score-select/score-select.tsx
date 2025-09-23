'use client';
import React, { useId } from 'react';
import { ButtonGroup, ButtonGroupItem } from '../button-group/button-group.js';
import { cn } from '../cn.js';
import {
  FormField,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Breakpoint, useBreakpoint } from '../hooks/use-breakpoint.js';
import { ScoreSelectProps } from './type.js';

export const ScoreSelect: React.FC<ScoreSelectProps> = ({
  name,
  size = 'medium',
  orientation = 'horizontal',
  wrapInMobile = true,
  value,
  label,
  hint,
  leftLabel,
  rightLabel,
  onChange,
  type,
}) => {
  const controlId = useId();
  const labelId = `${controlId}-label`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const { breakpoint } = useBreakpoint();
  const isMobile =
    breakpoint === Breakpoint.ExtraSmall || breakpoint === Breakpoint.Small;

  let scoreOptions: { value: string; label: string }[] = [];

  switch (type) {
    case '1-5': {
      scoreOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
      ];
      break;
    }
    case '1-7': {
      scoreOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
      ];
      break;
    }
    case '0-10': {
      scoreOptions = [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
      ];
      break;
    }
  }

  const isVerticalOrientation =
    orientation === 'vertical' || (isMobile && !wrapInMobile);

  const getButtonGroupClass = () => {
    if (isVerticalOrientation) {
      return 'gi-score-select-button-group-vertical';
    }
    return 'gi-score-select-button-group-horizontal';
  };

  const renderTopLabels = () => {
    return (
      leftLabel &&
      rightLabel &&
      scoreOptions.length > 2 &&
      orientation === 'horizontal' &&
      !isVerticalOrientation && (
        <div
          className={cn('gi-score-select-labels-responsive')}
          aria-hidden="true"
        >
          <div>
            {scoreOptions[0]?.label} – {leftLabel}
          </div>
          <div>
            {scoreOptions.at(-1)?.label} – {rightLabel}
          </div>
        </div>
      )
    );
  };

  const renderBottomLabels = () => {
    return (
      (leftLabel || rightLabel) && (
        <div
          className={cn('gi-score-select-labels', {
            'gi-score-select-labels-vertical': isVerticalOrientation,
          })}
          aria-hidden="true"
        >
          {orientation === 'horizontal' && isMobile ? (
            <>
              <div>
                {scoreOptions[0]?.label} – {leftLabel}
              </div>
              <div>
                {scoreOptions.at(-1)?.label} – {rightLabel}
              </div>
            </>
          ) : (
            <>
              <div>{leftLabel}</div>
              <div>{rightLabel}</div>
            </>
          )}
        </div>
      )
    );
  };

  return (
    <FormField className="gi-w-full">
      <FormFieldLabel id={labelId}>{label}</FormFieldLabel>
      {hint && <FormFieldHint id={hintId}>{hint}</FormFieldHint>}
      <div
        className={cn('gi-score-select-button-group', getButtonGroupClass())}
        role="group"
        aria-labelledby={labelId}
        aria-describedby={hintId}
      >
        {renderTopLabels()}
        <ButtonGroup
          name={name}
          size={size}
          defaultValue={value}
          onChange={(value) => onChange?.(value)}
          role="radiogroup"
          aria-labelledby={labelId}
          aria-describedby={hintId}
          className={cn({
            'gi-flex-col gi-items-start': isVerticalOrientation,
          })}
        >
          {scoreOptions.map((option) => (
            <ButtonGroupItem
              key={option.value}
              value={option.value}
              role="radio"
              aria-checked={value === option.value}
              aria-label={`${option.label}${leftLabel && option.value === scoreOptions[0]?.value ? ` - ${leftLabel}` : ''}${rightLabel && option.value === scoreOptions.at(-1)?.value ? ` - ${rightLabel}` : ''}`}
            >
              {option.label}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
        {renderBottomLabels()}
      </div>
    </FormField>
  );
};
