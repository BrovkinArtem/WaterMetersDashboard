import { getPaginationItems } from '@/shared/lib/getPaginationItems';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <div className={styles.pagination__list}>
        {items.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={styles.pagination__ellipsis}
              >
                ...
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <button
              key={item}
              type="button"
              className={`${styles.pagination__button} ${
                isActive ? styles['pagination__button--active'] : ''
              }`}
              onClick={() => onPageChange(item)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
