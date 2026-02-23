import React, { useState } from 'react';
import type { Position } from '../types/position';

interface PositionCardProps {
    position: Position;
    onSubmit: (positionId: number, repoUrl: string) => Promise<void>;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValidGithubUrl = (url: string) => /^https:\/\/(www\.)?github\.com\/.+/.test(url);

    const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    if (!isValidGithubUrl(inputValue)) {
      setError("Please enter a valid GitHub repository URL.");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      await onSubmit(position.id, inputValue);
      setInputValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
    return (
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition">

            <h2 className='text-xl font-semibold text-gray-900'>{position.title}</h2>

            <div className="mt-4 flex gap-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="https://github.com/your/repo"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={isSubmitting}
                />

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm font-medium rounded-md text-white transition
                        ${
                        isSubmitting
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>

            {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
        </div>
    );
};