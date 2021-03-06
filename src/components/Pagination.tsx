import PaginationButton, { PaginationAction } from './PaginationButton';

const NEXT = 'Next';
const PREVIOUS = 'Previous';
interface PaginationProps {
  reposNumber: number;
  page: number;
  fetchSpecificReposPage: (page: PaginationProps['page']) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  reposNumber,
  page,
  fetchSpecificReposPage,
}) => {
  const totalPages = Math.ceil(reposNumber / 30);

  const paginationAction = (action: PaginationAction): void => {
    if (action === NEXT && page !== totalPages) {
      fetchSpecificReposPage(page + 1);
    }
    if (action === PREVIOUS && page !== 1) {
      fetchSpecificReposPage(page - 1);
    }
  };

  const numberOfReposToShow = () => {
    return page === 1 ? page : (page - 1) * 30;
  };

  if (!reposNumber) return <></>;
  
  return (
    <section className="flex items-center justify-between my-3">

      <p>
        Showing <span className="font-semibold">{numberOfReposToShow()}</span>{' '}
        to{' '}
        <span className="font-semibold">
          {reposNumber > 30 ? page * 30 : reposNumber}
        </span>{' '}
        of <span className="font-semibold"> {reposNumber}</span> results
      </p>

      <div className="flex">
        {page !== 1 && (
          <PaginationButton
            label="Previous"
            paginationAction={paginationAction}
          />
        )}

        {page !== totalPages && (
          <PaginationButton label="Next" paginationAction={paginationAction} />
        )}
      </div>
    </section>
  );
};

export default Pagination;
