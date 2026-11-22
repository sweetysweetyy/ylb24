import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/feeloo-hooks/sync-gmail")({
  server: {
    handlers: {
      POST: async () => {
        const { runSyncForAllUsers } = await import("@/feeloo/lib/sync-engine.server");
        try {
          const results = await runSyncForAllUsers("gmail");
          return Response.json({ ok: true, results });
        } catch (e: any) {
          console.error("cron gmail", e);
          return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
        }
      },
    },
  },
});
