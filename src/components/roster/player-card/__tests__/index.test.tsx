
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../tests/test-utils';
import { PlayerCard } from '../index';

// Mock the child components to simplify this test
vi.mock('../PlayerCardHeader', () => ({
  default: ({ index, onRemove }: { index: number, onRemove: () => void }) => (
    <div data-testid="player-card-header">
      Player Card Header {index}
      <button onClick={onRemove} data-testid="remove-button">Remove</button>
    </div>
  )
}));

vi.mock('../PlayerFormFields', () => ({
  default: ({ player }: { player: any }) => (
    <div data-testid="player-form-fields">
      Player Form Fields for {player.id}
    </div>
  )
}));

describe('PlayerCard', () => {
  const mockPlayer = {
    id: 'player-test-id',
    name: 'Test Player',
    number: '42',
    size: 'L',
    gender: 'Female',
  };

  it('renders PlayerCardHeader and PlayerFormFields components', () => {
    render(
      <PlayerCard 
        player={mockPlayer}
        index={0}
        showName={true}
        showNumber={true}
        showShortsSize={false}
        showSockSize={false}
        showInitials={false}
        products={[]}
        onRemove={() => {}}
        onInputChange={() => {}}
        onSelectChange={() => {}}
        onProductChange={() => {}}
      />
    );
    
    expect(screen.getByTestId('player-card-header')).toBeInTheDocument();
    expect(screen.getByTestId('player-form-fields')).toBeInTheDocument();
    expect(screen.getByText('Player Card Header 0')).toBeInTheDocument();
    expect(screen.getByText(`Player Form Fields for ${mockPlayer.id}`)).toBeInTheDocument();
  });

  it('calls onRemove with the player id when remove button is clicked', () => {
    const mockOnRemove = vi.fn();
    
    render(
      <PlayerCard 
        player={mockPlayer}
        index={0}
        showName={true}
        showNumber={true}
        showShortsSize={false}
        showSockSize={false}
        showInitials={false}
        products={[]}
        onRemove={mockOnRemove}
        onInputChange={() => {}}
        onSelectChange={() => {}}
        onProductChange={() => {}}
      />
    );
    
    const removeButton = screen.getByTestId('remove-button');
    removeButton.click();
    
    expect(mockOnRemove).toHaveBeenCalledWith(mockPlayer.id);
  });
});
