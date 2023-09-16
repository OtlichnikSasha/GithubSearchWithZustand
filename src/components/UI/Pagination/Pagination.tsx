import { FC, memo } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Padingation.module.scss';

interface IPaginationProps {
  onPageChange: (selectedItem: { selected: number }) => void;
  pageCount: number;
  nextLabel?: string;
  previousLabel?: string;
  pageRangeDisplayed?: number;
}

const PaginationComponent: FC<IPaginationProps> = ({
  onPageChange,
  pageCount,
  nextLabel,
  previousLabel,
  pageRangeDisplayed = 5,
}) => {
  return (
    <section className={styles.pagination}>
      <ReactPaginate
        breakLabel='...'
        nextLabel={nextLabel}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel={previousLabel}
        renderOnZeroPageCount={null}
      />
    </section>
  );
};

export const Pagination = memo(PaginationComponent);
