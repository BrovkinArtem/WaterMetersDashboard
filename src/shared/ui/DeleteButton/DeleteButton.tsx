import TrashIcon from '@/assets/icons/trash.svg?react';

import styles from './DeleteButton.module.scss';

interface DeleteButtonProps {
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function DeleteButton({ disabled, onClick }: DeleteButtonProps) {
  return (
    <button
      type="button"
      className={styles.deleteButton}
      disabled={disabled}
      onClick={onClick}
      aria-label="Удалить счётчик"
    >
      <TrashIcon className={styles.deleteButton__icon} aria-hidden />
    </button>
  );
}
