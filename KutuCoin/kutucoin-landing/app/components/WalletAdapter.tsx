import React, { useState } from 'react';
import { useConnect, Connector as WagmiConnector } from 'wagmi'; // Import the Connector type from wagmi
import { Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Button } from '@/components/ui/button';

// Define the Connector interface, extending WagmiConnector to include isLoading
interface Connector extends WagmiConnector {
    isLoading?: boolean; // Optional property for loading state
}

interface WalletAdapterProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (connector: Connector) => void; // Use the specific type instead of any
}

export function WalletAdapter({ isOpen, onClose, onConnect }: WalletAdapterProps) {
    const { connectors } = useConnect(); // Just get connectors
    const [hoveredConnector, setHoveredConnector] = useState<string | null>(null);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Connect Your Wallet</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    {connectors.map((connector) => (
                        <Button
                            key={connector.id}
                            variant="outline"
                            className="relative flex items-center justify-start gap-3 h-14 w-full"
                            onClick={() => onConnect(connector as Connector)} // Cast connector here
                            onMouseEnter={() => setHoveredConnector(connector.id)}
                            onMouseLeave={() => setHoveredConnector(null)}
                        >
                            <Wallet className="h-5 w-5" />
                            <span>{connector.name}</span>
                            {/* Check if connector is in loading state */}
                            {connector.isLoading ? (
                                <div className="absolute right-4 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
                            ) : null}
                            {hoveredConnector === connector.id && (
                                <div className="absolute inset-0 bg-black/5 rounded-md" />
                            )}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
