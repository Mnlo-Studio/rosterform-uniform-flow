import { Order } from '@/types/orders';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create random players
const createRandomPlayers = (count: number) => {
  const players = [];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const genders = ['Male', 'Female'];
  
  for (let i = 0; i < count; i++) {
    players.push({
      id: uuidv4(),
      name: `Player ${i + 1}`,
      number: `${Math.floor(Math.random() * 99) + 1}`,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      gender: genders[Math.floor(Math.random() * genders.length)],
    });
  }
  
  return players;
};

// Create mock orders
export const mockOrders: Order[] = [
  {
    id: uuidv4(),
    orderId: 'ORD-001',
    teamName: 'Eagles Basketball',
    date: '2023-04-01',
    total: 1245.00,
    status: 'Completed',
    isPaid: true,
    userId: uuidv4(),
    players: createRandomPlayers(12),
    customerInfo: {
      id: uuidv4(),
      contactName: 'John Smith',
      email: 'john@eagles.com',
      phone: '555-123-4567',
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
    },
    products: [
      {
        id: uuidv4(),
        name: 'Basketball Jersey',
        pricePerItem: 65.00,
        notes: 'Home jerseys with custom numbers',
        images: [
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
        ],
      }
    ],
    productInfo: {
      products: [
        {
          id: uuidv4(),
          name: 'Basketball Jersey',
          pricePerItem: 65.00,
          notes: 'Home jerseys with custom numbers',
          images: [
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
          ],
        }
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    orderId: 'ORD-002',
    teamName: 'Tigers Soccer',
    date: '2023-04-05',
    total: 950.00,
    status: 'Pending',
    isPaid: false,
    userId: uuidv4(),
    players: createRandomPlayers(10),
    customerInfo: {
      id: uuidv4(),
      contactName: 'Jane Doe',
      email: 'jane@tigers.com',
      phone: '555-987-6543',
      address: '456 Oak Ave',
      city: 'Riverside',
      state: 'CA',
      zipCode: '92501',
    },
    products: [
      {
        id: uuidv4(),
        name: 'Soccer Uniform Set',
        pricePerItem: 95.00,
        notes: 'Complete set with jersey, shorts, and socks',
        images: [
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Uniform+Front',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Uniform+Back',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Shorts',
        ],
      }
    ],
    productInfo: {
      products: [
        {
          id: uuidv4(),
          name: 'Soccer Uniform Set',
          pricePerItem: 95.00,
          notes: 'Complete set with jersey, shorts, and socks',
          images: [
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Uniform+Front',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Uniform+Back',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Shorts',
          ],
        }
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    orderId: 'ORD-003',
    teamName: 'Wolves Baseball',
    date: '2023-04-10',
    total: 875.00,
    status: 'Cancelled',
    isPaid: false,
    userId: uuidv4(),
    players: createRandomPlayers(14),
    customerInfo: {
      id: uuidv4(),
      contactName: 'Mike Johnson',
      email: 'mike@wolves.com',
      phone: '555-456-7890',
      address: '789 Pine St',
      city: 'Oakville',
      state: 'NY',
      zipCode: '14120',
    },
    products: [
      {
        id: uuidv4(),
        name: 'Baseball Jersey',
        pricePerItem: 62.50,
        notes: 'Away jerseys with custom numbers and names',
        images: [
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
        ],
      }
    ],
    productInfo: {
      products: [
        {
          id: uuidv4(),
          name: 'Baseball Jersey',
          pricePerItem: 62.50,
          notes: 'Away jerseys with custom numbers and names',
          images: [
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
          ],
        }
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    orderId: 'ORD-004',
    teamName: 'Hawks Volleyball',
    date: '2023-04-15',
    total: 720.00,
    status: 'Completed',
    isPaid: true,
    userId: uuidv4(),
    players: createRandomPlayers(8),
    customerInfo: {
      id: uuidv4(),
      contactName: 'Sarah Williams',
      email: 'sarah@hawks.com',
      phone: '555-789-0123',
      address: '101 Elm St',
      city: 'Mountainview',
      state: 'CO',
      zipCode: '80401',
    },
    products: [
      {
        id: uuidv4(),
        name: 'Volleyball Jersey',
        pricePerItem: 90.00,
        notes: 'Custom jerseys with player numbers',
        images: [
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
        ],
      }
    ],
    productInfo: {
      products: [
        {
          id: uuidv4(),
          name: 'Volleyball Jersey',
          pricePerItem: 90.00,
          notes: 'Custom jerseys with player numbers',
          images: [
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
          ],
        }
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    orderId: 'ORD-005',
    teamName: 'Panthers Football',
    date: '2023-04-20',
    total: 1650.00,
    status: 'Pending',
    isPaid: false,
    userId: uuidv4(),
    players: createRandomPlayers(15),
    customerInfo: {
      id: uuidv4(),
      contactName: 'Robert Davis',
      email: 'robert@panthers.com',
      phone: '555-321-6547',
      address: '202 Maple Dr',
      city: 'Lakeside',
      state: 'TX',
      zipCode: '75001',
    },
    products: [
      {
        id: uuidv4(),
        name: 'Football Jersey',
        pricePerItem: 110.00,
        notes: 'Home jerseys with custom numbers and team logo',
        images: [
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
          'https://placehold.co/400x400/e2e8f0/1e293b?text=Logo+Detail',
        ],
      }
    ],
    productInfo: {
      products: [
        {
          id: uuidv4(),
          name: 'Football Jersey',
          pricePerItem: 110.00,
          notes: 'Home jerseys with custom numbers and team logo',
          images: [
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Front',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Jersey+Back',
            'https://placehold.co/400x400/e2e8f0/1e293b?text=Logo+Detail',
          ],
        }
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Update remaining mock orders with the same structure
for (let i = 1; i < mockOrders.length; i++) {
  if (mockOrders[i]) {
    mockOrders[i].productInfo = { products: mockOrders[i].products };
    mockOrders[i].createdAt = new Date().toISOString();
    mockOrders[i].updatedAt = new Date().toISOString();
    mockOrders[i].userId = uuidv4();
    
    if (mockOrders[i].customerInfo) {
      mockOrders[i].customerInfo.id = uuidv4();
    }
  }
}
