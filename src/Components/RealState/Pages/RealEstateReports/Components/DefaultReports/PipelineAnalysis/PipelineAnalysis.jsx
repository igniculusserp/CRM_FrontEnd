import { Typography } from "@mui/material";
import LeadStageAnalysis from "./AllCompomemts/LeadStageAnalysis";
import LeadUnqualifiedReasons from "./AllCompomemts/LeadUnqualifiedReasons";
import LeadLostReasons from "./AllCompomemts/LeadLostReasons";
import LeadFunnel from "./AllCompomemts/LeadFunnel";
import LeadTouchedUntouched from "./AllCompomemts/LeadTouchedUntouched";

const PipelineAnalysis = () => {
  return (
    <div className="flex flex-col gap-5">
      <Typography className="!text-xl !font-bold">Pipeline Analysis</Typography>

      <div className="grid grid-cols-1 gap-2 rounded-lg bg-white p-3 shadow-sm lg:grid-cols-2">
        <div>
          <LeadStageAnalysis />
        </div>
        <div>
          <LeadFunnel />
        </div>
        <div>
          <LeadUnqualifiedReasons />
        </div>
        <div>
          <LeadLostReasons />
        </div>
        <div>
          <LeadTouchedUntouched />
        </div>
      </div>
    </div>
  );
};

export default PipelineAnalysis;
