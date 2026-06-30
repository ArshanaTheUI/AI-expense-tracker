export default function SummaryCard({
title,
amount,
bgColor,
}) {
return (
<div
className={`${bgColor} text-white p-4 rounded-lg`}
> <h3 className="font-semibold">
{title} </h3>


  <p className="text-2xl font-bold">
    ₹{amount}
  </p>
</div>

);
}
