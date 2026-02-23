import React from 'react';
import type { Position } from '../types/position';
import { PositionCard } from './PositionCard';

interface PositionsListProps {
    positions: Position[];
    onSubmit: (positionId: number, repoUrl: string) => Promise<void>;
}

const PositionsList: React.FC<PositionsListProps> = ({ positions, onSubmit }) => {

    return (
            <div className="space-y-6">
                {positions.map((position) => (
                    <PositionCard key={position.id} position={position} onSubmit={onSubmit} />
                ))}
            </div>
    );
};

export default PositionsList;