import Card from "./SubComponents/Card";

export default function Subscription() {
  const standardText = [
    "Single User",
    "2 Projects",
    "1 GB Storage",
    "History",
    "Web Map",
    "API",
    "Community Support",
  ];

  const premiumText = [
    "Up to 6 users",
    "Unlimited Projects",
    "10 GB Storage",
    "History (40 GB)",
    "Web Map",
    "API",
    "Email Support",
  ];

  const enterpriseText = [
    "Unlimited User",
    "Unlimited Projects",
    "50 GB Storage",
    "History (200 GB)",
    "Web Map",
    "API",
    "Email Support",
  ];

  return (
    <div className="h-full w-full p-8 flex flex-col justify-center bg-slate-200">
      <h1 className="text-2xl font-medium tracking-wide">
        Upgrade Subscription
      </h1>
      <div className="flex mt-3">
        <button className="p-3 w-max border-[0.7px] border-gray-400 uppercase text-gray-400 bg-white hover:bg-gray-200 text-md font-normal">
          Yearly
        </button>
        <button className="p-3 w-max border-[0.7px] border-gray-400 uppercase text-gray-400 bg-white hover:bg-gray-200 text-md font-normal">
          Monthly
        </button>
      </div>
      <div className="flex items-center justify-center">
        <Card
          plan="Standard Plan"
          texts={standardText}
          text="/Per User /Month"
          price="11.90"
        />
        <Card
          plan="Premium Plan"
          texts={premiumText}
          text="/Per User /Month"
          price="65.00"
        />
        <Card
          plan="Enterprise Plan"
          texts={enterpriseText}
          text="/Per User /Month"
          price="149.00"
        />
      </div>
    </div>
  );
}
