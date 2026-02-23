import React from 'react';
import PositionsList from '../components/PositionsList';
import { usePositions } from '../hooks/usePositions';

const Home: React.FC = () => {
    const {
        positions,
        isLoading,
        error,
        retry,
        submitApplication,
    } = usePositions();

     return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Open Positions
            </h1>

            {isLoading && (
                <p className="text-gray-600">Loading positions...</p>
            )}

            {error && (
                <div className="mb-4">
                <p className="text-red-600 text-sm">{error}</p>
                <button
                    onClick={retry}
                    className="text-sm text-blue-600 hover:underline mt-1"
                >
                    Retry
                </button>
                </div>
            )}

            {!isLoading && !error && (
                <PositionsList
                positions={positions}
                onSubmit={submitApplication}
                />
            )}
        </div>
  );
};

export default Home;