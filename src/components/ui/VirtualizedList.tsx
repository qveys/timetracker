import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T) => React.ReactNode;
}

export function VirtualizedList<T>({ items, itemHeight, renderItem }: VirtualizedListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        className="virtualized-list-container relative w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`, // Doit rester inline car dynamique
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            className="virtualized-list-item absolute left-0 right-0"
            style={{
              height: `${virtualItem.size}px`, // Doit rester inline car dynamique
              transform: `translateY(${virtualItem.start}px)`, // Doit rester inline car dynamique
            }}
          >
            {renderItem(items[virtualItem.index])}
          </div>
        ))}
      </div>
    </div>
  );
} 