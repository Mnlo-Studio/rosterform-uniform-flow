
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../tests/test-utils';
import PlayerFormFields from '../PlayerFormFields';

// Mock the ProductSelect component since it might be complex
vi.mock('../../ProductSelect', () => ({
  default: ({ id }: { id: string }) => <div data-testid={`product-select-${id}`}>Product Select Mock</div>
}));

describe('PlayerFormFields', () => {
  const mockPlayer = {
    id: 'test-player-123',
    name: 'John Doe',
    number: '10',
    size: 'M',
    gender: 'Male',
    shortsSize: 'M',
    sockSize: 'M',
    initials: 'JD',
  };

  it('renders name field when showName is true', () => {
    render(
      <PlayerFormFields 
        player={mockPlayer}
        showName={true}
        showNumber={false}
        showShortsSize={false}
        showSockSize={false}
        showInitials={false}
        products={[]}
        onInputChange={() => {}}
        onSelectChange={() => {}}
        onProductChange={() => {}}
      />
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  });

  it('does not render name field when showName is false', () => {
    render(
      <PlayerFormFields 
        player={mockPlayer}
        showName={false}
        showNumber={false}
        showShortsSize={false}
        showSockSize={false}
        showInitials={false}
        products={[]}
        onInputChange={() => {}}
        onSelectChange={() => {}}
        onProductChange={() => {}}
      />
    );
    
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('renders all optional fields when they are enabled', () => {
    render(
      <PlayerFormFields 
        player={mockPlayer}
        showName={true}
        showNumber={true}
        showShortsSize={true}
        showSockSize={true}
        showInitials={true}
        products={[]}
        onInputChange={() => {}}
        onSelectChange={() => {}}
        onProductChange={() => {}}
      />
    );
    
    // Check for all field labels
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Number')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Shorts Size')).toBeInTheDocument();
    expect(screen.getByText('Sock Size')).toBeInTheDocument();
    expect(screen.getByText('Initials')).toBeInTheDocument();

    // Check for field values
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('JD')).toBeInTheDocument();
  });

  it('always renders product select and size/gender regardless of other options', () => {
    render(
      <PlayerFormFields 
        player={mockPlayer}
        showName={false}
        showNumber={false}
        showShortsSize={false}
        showSockSize={false}
        showInitials={false}
        products={[]}
        onInputChange={() => {}}
        onSelectChange={() => {}}
        onProductChange={() => {}}
      />
    );
    
    // Core fields should always be present
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    
    // Optional fields should be absent
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Number')).not.toBeInTheDocument();
    expect(screen.queryByText('Shorts Size')).not.toBeInTheDocument();
    expect(screen.queryByText('Sock Size')).not.toBeInTheDocument();
    expect(screen.queryByText('Initials')).not.toBeInTheDocument();
  });
});
