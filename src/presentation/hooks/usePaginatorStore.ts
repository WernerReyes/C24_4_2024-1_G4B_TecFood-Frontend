import { useDispatch, useSelector } from "react-redux";
import { AppState, Paginator, changePaginator } from "@/infraestructure/store";

export const usePaginatorStore = () => {
  const dispatch = useDispatch();

  const { currentPage,limit, total, next, previous } = useSelector(
    (state: AppState) => state.paginator,
  );

  const startChangePaginator = (paginator: Paginator) => {
    dispatch(changePaginator(paginator));
  };

  return {
    //* Attributes
    currentPage,
    limit,
    total,
    next,
    previous,

    //* Methods
    startChangePaginator,
  };
};
