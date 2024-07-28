import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

test('renders Pagination with correct page information', () => {
  const currentPage = 2;
  const totalItems = 30;
  const onPageChange = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalItems={totalItems}
    />
  );

  const prevButton = screen.getByRole('button', { name: /Previous/i });
  expect(prevButton).toBeInTheDocument();
  expect(prevButton).toBeEnabled();

  const pageInfo = screen.getByText(`Page ${currentPage} of 3`); // totalPages = 3 for totalItems = 30
  expect(pageInfo).toBeInTheDocument();

  const nextButton = screen.getByRole('button', { name: /Next/i });
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toBeEnabled();

  fireEvent.click(nextButton);
  expect(onPageChange).toHaveBeenCalledWith(currentPage + 1);

  fireEvent.click(prevButton);
  expect(onPageChange).toHaveBeenCalledWith(currentPage - 1);
});

test('disables Previous button on first page', () => {
  const currentPage = 1;
  const totalItems = 30;
  const onPageChange = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalItems={totalItems}
    />
  );

  const prevButton = screen.getByRole('button', { name: /Previous/i });
  expect(prevButton).toBeInTheDocument();
  expect(prevButton).toBeDisabled();

  const pageInfo = screen.getByText(`Page ${currentPage} of 3`); // totalPages = 3 for totalItems = 30
  expect(pageInfo).toBeInTheDocument();

  const nextButton = screen.getByRole('button', { name: /Next/i });
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toBeEnabled();

  fireEvent.click(nextButton);
  expect(onPageChange).toHaveBeenCalledWith(currentPage + 1);
});

test('disables Next button on last page', () => {
  const currentPage = 3;
  const totalItems = 30;
  const onPageChange = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalItems={totalItems}
    />
  );

  const prevButton = screen.getByRole('button', { name: /Previous/i });
  expect(prevButton).toBeInTheDocument();
  expect(prevButton).toBeEnabled();

  const pageInfo = screen.getByText(`Page ${currentPage} of 3`); // totalPages = 3 for totalItems = 30
  expect(pageInfo).toBeInTheDocument();

  const nextButton = screen.getByRole('button', { name: /Next/i });
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toBeDisabled();

  fireEvent.click(prevButton);
  expect(onPageChange).toHaveBeenCalledWith(currentPage - 1);
});
