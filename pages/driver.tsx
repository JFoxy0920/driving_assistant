// DRIVER VIEW
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";


export default function Driver() {
  const [ride, setRide] = useState<any>(null);


  const claimRide = async () => {
    const res = await fetch("/api/claim", { method: "POST" });
    const ride = await res.json();
  
    if (ride.message) {
      console.error("No rides available");
    } else {
      setRide(ride);
    }
};

 function dropOff() {
  setRide(null);
}

  
  return (
    <div style={{ padding: 20 }}>
    <h1>Driver Dashboard</h1>
      {!ride ? (
      <button onClick={claimRide}>Claim Next Ride</button>
      ) : (
    <div>
      <h2>Assigned Ride</h2>
      <p>Name: {ride.name}</p>
      <p>Group size: {ride.group_size}</p>
      <p>Pickup: {ride.pickup_location}</p>
      <p>filler</p>
      <button onClick={dropOff}>Drop Ride</button>
    </div>
        
      )}
    </div>
  );
}
