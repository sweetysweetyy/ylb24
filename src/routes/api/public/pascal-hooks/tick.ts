import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/pascal-hooks/tick")({
  server: {
    handlers: {
      POST: async () => {
        try {
          const { runGlobalTick } = await import("@/pascal/lib/cron-runner.server");
          const started = Date.now();
          const r = await runGlobalTick();
          return Response.json({ ok: true, duration_ms: Date.now() - started, ...r });
        } catch (e) {
          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            await supabaseAdmin.from("psc_tick_logs").insert({ user_id: null, scope: "global_tick", status: "error", duration_ms: 0, error: String(e), result: {} } as never);
          } catch {/* ignore */}
          return Response.json({ ok: false, error: String(e) }, { status: 500 });
        }
      },
      GET: async () => Response.json({ ok: true, msg: "PASCAL tick endpoint" }),
    },
  },
});