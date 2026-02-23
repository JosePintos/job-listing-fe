import React from 'react';
import type { Position } from '../types/position';
import PositionsList from '../components/PositionsList';
import { getPositions, submitRepo } from '../api/jobsApi';

const Home: React.FC = () => {
    const [positions, setPositions] = React.useState<Position[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);


    const fetchPositions = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getPositions();
            setPositions(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (jobId: number, repoUrl: string) => {
        try {
            const response = await submitRepo(jobId, repoUrl);

            if (!response.ok) {
                throw new Error("Submission failed.");
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    };

    React.useEffect(() => {
        fetchPositions();
    }, []);

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
                    onClick={fetchPositions}
                    className="text-sm text-blue-600 hover:underline mt-1"
                >
                    Retry
                </button>
                </div>
            )}

            {!isLoading && !error && (
                <PositionsList
                positions={positions}
                onSubmit={handleSubmit}
                />
            )}
        </div>
  );
};

export default Home;