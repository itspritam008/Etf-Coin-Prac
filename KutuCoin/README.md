# KutuCoin - The Evolving Token of Love 💝

KutuCoin is a unique blockchain-based platform that allows couples to celebrate and strengthen their relationships through evolving digital tokens. As relationships grow, so do the tokens - transforming from cute symbols of affection into meaningful representations of commitment.

## Project Structure

```
.
├── kutucoin-landing/          # Next.js frontend application
└── kutuCoin-web3/            # Smart contract and blockchain integration
```

## Features

- **Evolution Stages**: Tokens evolve through three distinct phases:
  - 🎀 Infatuation: Cute, playful designs with collectible emojis
  - 💍 Commitment: Mature designs with milestone rewards
  - ∞ Eternity: Symbols of lasting commitment with exclusive perks

- **Smart Contract Capabilities**:
  - Token evolution mechanism
  - Milestone-based rewards
  - Partnership integration
  - Burn mechanism for value retention
  - Transfer cooldown periods
  - Purchase fee system

- **Web Platform**:
  - User-friendly interface for token management
  - Visual representation of token evolution
  - Integration with AIA Chain
  - Partnership rewards dashboard

## Technical Stack

- **Frontend**:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components

- **Blockchain**:
  - Solidity 0.8.27
  - Hardhat
  - OpenZeppelin contracts
  - AIA Chain (Testnet)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kutucoin
```

2. Install frontend dependencies:
```bash
cd kutucoin-landing
npm install
```

3. Install smart contract dependencies:
```bash
cd ../kutuCoin-web3
npm install
```

### Configuration

1. Create a `.env` file in the `kutuCoin-web3` directory:
```env
API_URL=https://aia-dataseed1-testnet.aiachain.org
PRIVATE_KEY=your_private_key_here
```

2. Update the network configuration in `hardhat.config.js` if needed.

### Running the Project

1. Start the frontend development server:
```bash
cd kutucoin-landing
npm run dev
```

2. Deploy the smart contract (from kutuCoin-web3 directory):
```bash
npx hardhat run scripts/deploy.js --network aiaTestnet
```

## Smart Contract

The KutuCoin smart contract is deployed on AIA Chain Testnet:
- Address: `0x64d7EF4Ad3dB502eb053c4A2C34976169eb3bBe9`
- Network: AIA Chain Testnet (Chain ID: 1320)

### Key Features:

- Total Supply: 10 billion tokens
- Distribution:
  - 30% locked for evolution milestones
  - 50% available for purchase
  - 20% reserved for partnerships
- Purchase fee: 2% (adjustable up to 10%)
- Daily transfer cooldown period
- Milestone-based burn mechanism

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- Smart contract includes standard security features from OpenZeppelin
- Transfer cooldown mechanism to prevent abuse
- Owner-only functions for critical operations
- Maximum mint and fee limitations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For queries about the project, please create an issue in the repository.

## Acknowledgments

- OpenZeppelin for secure smart contract components
- AIA Chain for blockchain infrastructure
- Shadcn/ui for component library