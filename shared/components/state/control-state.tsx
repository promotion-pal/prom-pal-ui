import { FC, ReactNode } from "react";
import { CommonEmpty } from "./empty";
import { CommonError } from "./error";
import { CommonSkeleton } from "./skeleton";

export interface CommonControlState {
  isError: boolean;
  isEmpty: boolean;
  isLoading: boolean;
}

interface CommonControlStateProps extends CommonControlState {
  error?: ReactNode;
  empty?: ReactNode;
  loading?: ReactNode;
  children?: ReactNode;
  styleWrapper?: string;
}

const CommonControlState: FC<CommonControlStateProps> = ({
  error = <CommonError />,
  isError,
  loading = <CommonSkeleton />,
  isLoading,
  empty = <CommonEmpty />,
  isEmpty,
  children,
  styleWrapper,
}) => {
  return (
    <section className={styleWrapper}>
      {isError ? error : isLoading ? loading : isEmpty ? empty : children}
    </section>
  );
};

export { CommonControlState };
