
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/test-utils';
import GenderSelect from '../GenderSelect';

// Similar to SizeSelect, we'll focus on basic rendering for Radix UI components
describe('GenderSelect', () => {
  it('renders with Gender label', () => {
    render(
      <GenderSelect 
        id="test-gender" 
        value="Male" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByText('Gender')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(
      <GenderSelect 
        id="test-gender" 
        value="Female" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByText('Female')).toBeInTheDocument();
  });
});
