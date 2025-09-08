import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-100">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">
          You are in the queue.
        </h2>
        <p className="text-gray-400 text-lg">Your ride request has been logged.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-100">
      <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-white drop-shadow-lg">
        Request a Ride
      </h1>

      <input
        className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 w-72 mb-5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="mb-5 w-72">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Group Size
        </label>
        <input
          className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 w-full text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          type="number"
          min="1"
          max="4"
          value={groupSize}
          onChange={(e) => setGroupSize(parseInt(e.target.value))}
        />
      </div>

      <input
        className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 w-72 mb-8 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Pickup location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      <button
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        onClick={submitRide}
      >
        Request Ride
      </button>
    </div>
  );
}
