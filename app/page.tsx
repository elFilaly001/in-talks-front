import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const h = await headers();
    const accept = (h.get("accept-language") || "").toLowerCase();
    const locale = accept.includes("fr") ? "fr" : "en";
    redirect(`/${locale}`);
}
