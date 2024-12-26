import { PropsWithChildren, useMemo, useState } from 'react';

import { Translator } from 'components/i18n';

import type { IStep } from '@chainlit/react-client';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  step: IStep;
  isRunning?: boolean;
}

export default function Step({
  step,
  children,
  isRunning
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);
  const using = useMemo(() => {
    return isRunning && step.start && !step.end && !step.isError;
  }, [step, isRunning]);

  const hasOutput = step.output || step.steps?.length;
  const isError = step.isError;

  const stepName = step.name;

  return (
    <div className='flex flex-col flex-grow w-0'>
      <p
className={cn('flex items-center gap-1 group/step', isError && "text-red-500", hasOutput && "cursor-pointer", !isRunning && "text-muted-foreground hover:text-foreground", isRunning && "loading-shimmer")}        onClick={() => setOpen(!open)}
        id={`step-${stepName}`}
      >
        {using ? (
              <>
                <Translator path="components.molecules.detailsButton.using" />{' '}
                {stepName}
              </>
            ) : (
              <>
                <Translator path="components.molecules.detailsButton.used" />{' '}
                {stepName}
              </>
            )}
            {hasOutput ? open ? <ChevronUp className='invisible group-hover/step:visible !size-4' /> : <ChevronDown className='invisible group-hover/step:visible !size-4' /> : null}
        </p>
   
      {open && (
        <div
        className='flex-grow mt-4 ml-2 pl-4 border-l-2 border-primary'
        >
          {children}
        </div>
      )}
    </div>
  );
}
