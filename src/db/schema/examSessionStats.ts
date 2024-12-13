import { integer, json, pgTable } from "drizzle-orm/pg-core";

import { primaryId } from "@/db/schema/utils";

const examSessionStats = pgTable("exam_session_stats", {
  id: primaryId(),

  pasteCount: integer("paste_count").default(0),
  timeOff: json("time_off").$type<Record<string, number>>().default({}),
});

export default examSessionStats;
