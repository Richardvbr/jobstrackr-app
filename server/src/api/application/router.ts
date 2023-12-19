import { z } from "zod";

import { router, publicProcedure } from "../../trpc";
import supabase from "../supabase";

export const applicationRouter = router({
  getApplications: publicProcedure.query(async (req) => {
    console.log("hi");
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    console.log(data);

    return data;
  }),
});
