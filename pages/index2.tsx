import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [name, setName] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [pickup, setPickup] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitRide = async () => {
    const { error } = await supabase.from("ride_requests").insert([
      { name, group_size: groupSize, pickup_location: pickup, status: "queued" },
    ]);
    if (error) {
      console.error("Insert failed:", error.message);
      alert("Error submitting ride: " + error.message);
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("ride_requests")
        .select("*")
        .limit(1);
      if (error) {
        console.error("Database connection failed:", error.message);
      } else {
        console.log("Database connection works:", data);
      }
    };
    testConnection();
  }, []);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <h2 className="text-2xl font-semibold text-green-700">
          🎉 You are in the queue!
        </h2>
        <p className="text-gray-600">Have a great night! 🚗</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Request a Ride 🚕
      </h1>

      <input
        className="border rounded-xl p-3 w-64 mb-4 shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="mb-4 w-64">
        <label className="block mb-1 font-medium text-gray-700">
          Group Size
        </label>
        <input
          className="border rounded-xl p-3 w-full shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
          type="number"
          min="1"
          max="4"
          value={groupSize}
          onChange={(e) => setGroupSize(parseInt(e.target.value))}
        />
      </div>

      <input
        className="border rounded-xl p-3 w-64 mb-6 shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
        placeholder="Pickup location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105"
        onClick={submitRide}
      >
        Request Ride
      </button>
    </div>
  );
}
