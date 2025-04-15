
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../tests/test-utils';
import PlayerTextField from '../PlayerTextField';

describe('PlayerTextField', () => {
  it('renders with label and value', () => {
    render(
      <PlayerTextField 
        id="test-id" 
        label="Test Label" 
        value="Test Value" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const mockOnChange = vi.fn();
    render(
      <PlayerTextField 
        id="test-id" 
        label="Test Label" 
        value="Test Value" 
        onChange={mockOnChange} 
      />
    );
    
    const input = screen.getByDisplayValue('Test Value');
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('applies maxLength constraint when provided', () => {
    render(
      <PlayerTextField 
        id="test-id" 
        label="Test Label" 
        value="Test" 
        onChange={() => {}} 
        maxLength={5}
      />
    );
    
    const input = screen.getByDisplayValue('Test');
    expect(input).toHaveAttribute('maxLength', '5');
  });

  it('applies placeholder when provided', () => {
    render(
      <PlayerTextField 
        id="test-id" 
        label="Test Label" 
        value="" 
        onChange={() => {}} 
        placeholder="Test Placeholder"
      />
    );
    
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });
});
