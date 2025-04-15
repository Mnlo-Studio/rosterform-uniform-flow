
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../tests/test-utils';
import PlayerCardHeader from '../PlayerCardHeader';

describe('PlayerCardHeader', () => {
  it('renders the correct player number', () => {
    render(<PlayerCardHeader index={2} onRemove={() => {}} />);
    
    expect(screen.getByText('Player 3')).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', () => {
    const mockOnRemove = vi.fn();
    render(<PlayerCardHeader index={0} onRemove={mockOnRemove} />);
    
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
