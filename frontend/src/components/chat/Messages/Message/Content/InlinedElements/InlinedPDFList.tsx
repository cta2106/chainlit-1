import { PDFElement } from '@/components/Elements/PDF';
import type { IPdfElement } from '@chainlit/react-client';

interface Props {
  items: IPdfElement[];
}

const InlinedPDFList = ({ items }: Props) => (
  <div className='flex flex-col gap-2'>
    {items.map((pdf, i) => {
      return (
        <div
          key={i}
          className='max-w-[600px] h-[400px]'
        >
          <PDFElement element={pdf} />
        </div>
      );
    })}
  </div>
);

export { InlinedPDFList };
