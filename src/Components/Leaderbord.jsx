import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderbord = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">
        LeetCode Leaderboard
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Rank</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.username} className="text-center border">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{student.username}</td>
                <td className="border p-2 font-bold">{student.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderbord;
