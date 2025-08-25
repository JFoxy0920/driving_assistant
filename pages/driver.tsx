// DRIVER VIEW
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";


export default function Driver() {
const [ride, setRide] = useState<any>(null);


const claimRide = async () => {
const { data, error } = await fetch("/api/claim", {
method: "POST",
}).then((res) => res.json());
if (!error) setRide(data);
};


return (
<div style={{ padding: 20 }}>
<h1>Driver Dashboard 🚙</h1>
{!ride ? (
<button onClick={claimRide}>Claim Next Ride</button>
) : (
<div>
<h2>Assigned Ride</h2>
<p>Name: {ride.name}</p>
<p>Group size: {ride.group_size}</p>
<p>Pickup: {ride.pickup_location}</p>
</div>
)}
</div>
);
}
