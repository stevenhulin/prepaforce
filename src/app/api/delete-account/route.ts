import { NextResponse, NextRequest } from "next/server";
import { createClient as createServerAnon } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// ⚠️ Ces variables doivent exister dans .env.local (⚠️ service key NON public)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-only

export async function POST(req: NextRequest) {
  try {
    // 1) Récupérer l'utilisateur courant via les cookies (client anon)
    const supabase = await createServerAnon();
    const { data: { user }, error: uErr } = await supabase.auth.getUser();
    if (uErr || !user) {
      return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
    }

    // 2) Admin client pour supprimer l'utilisateur
    const admin = createAdminClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: delErr } = await admin.auth.admin.deleteUser(user.id);
    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Erreur serveur." }, { status: 500 });
  }
}
