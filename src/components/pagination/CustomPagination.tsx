import { Pagination, Stack } from '@mui/material';
import { FC } from 'react';

interface ICustomPagination {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CustomPagination: FC<ICustomPagination> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  function handleChange(e: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
  }
  return (
    <Stack
      spacing={2}
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
    >
      <Pagination
        count={totalPages}
        variant='outlined'
        shape='rounded'
        onChange={handleChange}
        page={currentPage}
      />
    </Stack>
  );
};
