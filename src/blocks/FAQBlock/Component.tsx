// src/components/FAQBlockComponent.tsx
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import RichText from '@/components/RichText';
import type { FAQBlock as FAQBlockProps } from 'src/payload-types';

type Props = {
  items: FAQBlockProps['items'];
};

export const FAQBlockComponent: React.FC<Props> = ({ items }) => {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <RichText content={item.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
