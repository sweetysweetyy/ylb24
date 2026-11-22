import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/feeloo-hooks/sync-sheets")({
  server: {
    handlers: {
      POST: async () => {
        const { runSyncForAllUsers } = await import("@/feeloo/lib/sync-engine.server");
        try {
          const results = await runSyncForAllUsers("sheets");
          return Response.json({ ok: true, results });
        } catch (e: any) {
          console.error("cron sheets", e);
          return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
        }
      },
    },
  },
});
