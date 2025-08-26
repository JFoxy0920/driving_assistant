// RIDER VIEW
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// supabase fields 
export default function Home() {
  const [name, setName] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [pickup, setPickup] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // async function allows 'await' command -> compatibility with supabase
  const submitRide = async () => {
    const { error } = await supabase.from("ride_requests").insert([
      { name, group_size: groupSize, pickup_location: pickup },
    ]);
    if (!error) setSubmitted(true);
  };

  // test DB connection on page load
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("ride_requests").select("*").limit(1);
      if (error) {
        console.error("Database connection failed:", error.message);
      } else {
        console.log("Database connection works:", data);
      }
    };

    testConnection();
  }, []);

  if (submitted) {
    return <h2>You are in the queue! Have a great night.</h2>;
  }
  
// main page
return (
<div style={{ padding: 20 }}>
<h1>"Party name"</h1>
<input
placeholder="Your name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<br />
<p>Group Size: </p>
<input
type="number"
min="1"
max="4"
value={groupSize}
onChange={(e) => setGroupSize(parseInt(e.target.value))}
/>
<br />
<input
placeholder="Pickup location"
value={pickup}
onChange={(e) => setPickup(e.target.value)}
/>
<br />
<button onClick={submitRide}>Request Ride</button>
</div>
);
}
