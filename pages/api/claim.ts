// QUEUE LOGIC
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";


export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
if (req.method !== "POST") return res.status(405).end();


const { data: ride, error } = await supabase
.from("ride_requests")
.select("*")
.eq("status", "queued")
.order("created_at", { ascending: true })
.limit(1)
.single();


if (error || !ride) return res.json({ message: "No rides available" });


await supabase
.from("ride_requests")
.update({ status: "assigned" })
.eq("id", ride.id);


res.json(ride);
}
