
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../tests/test-utils';
import SizeSelect from '../SizeSelect';

// Note: Testing Radix UI Select is tricky in JSDOM environment
// We'll focus on basic rendering for now
describe('SizeSelect', () => {
  it('renders with label', () => {
    render(
      <SizeSelect 
        id="test-size" 
        label="Size Test" 
        value="M" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByText('Size Test')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(
      <SizeSelect 
        id="test-size" 
        label="Size" 
        value="XL" 
        onChange={() => {}} 
      />
    );
    
    // Radix UI Select renders the value inside the trigger
    expect(screen.getByText('XL')).toBeInTheDocument();
  });
});
