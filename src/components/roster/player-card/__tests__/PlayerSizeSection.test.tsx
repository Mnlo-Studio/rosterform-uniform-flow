
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/test-utils';
import PlayerSizeSection from '../PlayerSizeSection';

describe('PlayerSizeSection', () => {
  it('renders both size and gender selects', () => {
    render(
      <PlayerSizeSection 
        playerId="test-player-id"
        size="L"
        gender="Male"
        onSizeChange={() => {}}
        onGenderChange={() => {}}
      />
    );
    
    // Check if both labels are present
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    
    // Check if values are displayed
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
});
