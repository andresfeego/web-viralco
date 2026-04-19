import { useState } from 'react';

export interface UIAccordionItem {
  id: string;
  title: string;
  content: string;
  meta?: string;
}

interface UIAccordionProps {
  items: UIAccordionItem[];
  defaultOpenId?: string;
}

export default function UIAccordion({ items, defaultOpenId }: UIAccordionProps) {
  const [openId, setOpenId] = useState(defaultOpenId ?? items[0]?.id);

  return (
    <div className="ui-accordion">
      {items.map((item) => {
        const isOpen = item.id === openId;

        return (
          <article key={item.id} className="ui-accordion-item">
            <button
              className="ui-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? '' : item.id)}
            >
              <span>{item.title}</span>
              <span>{item.meta ?? (isOpen ? 'menos' : 'mas')}</span>
            </button>
            {isOpen ? <div className="ui-accordion-content">{item.content}</div> : null}
          </article>
        );
      })}
    </div>
  );
}
