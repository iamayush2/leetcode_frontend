import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://leetcode-backend-eta.vercel.app/leaderboard"
        );

        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // Auto-refresh every 30 sec

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        LeetCode Leaderboard
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Rank</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Easy</th>
              <th className="border px-4 py-2">Medium</th>
              <th className="border px-4 py-2">Hard</th>
              <th className="border px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <tr key={user.username} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.easy}</td>
                  <td className="border px-4 py-2">{user.medium}</td>
                  <td className="border px-4 py-2">{user.hard}</td>
                  <td className="border px-4 py-2 font-bold">{user.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
