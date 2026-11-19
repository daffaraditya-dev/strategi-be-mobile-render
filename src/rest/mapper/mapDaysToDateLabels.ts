import { AggregateItem } from "../handlers/moda/type/common";

export function mapDaysToDateLabels(
  weeklyResp: Record<string, AggregateItem> | undefined,
  targetDates: Date[]
): Record<string, AggregateItem> {
  if (!weeklyResp || targetDates.length === 0) return {};

  return Object.entries(weeklyResp).reduce((acc, [dateStr, data]) => {
    const currentDate = new Date(dateStr);
    const onlyOneTarget = targetDates.length === 1;

    if (onlyOneTarget) {
      const diffTime = currentDate.getTime() - targetDates[0].getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      let label = "H";
      if (diffDays > 0) {
        label += ` + ${diffDays}`;
      } else if (diffDays < 0) {
        label += ` - ${Math.abs(diffDays)}`;
      }

      acc[label] = data;
    } else {
      const matchIndex = targetDates.findIndex(
        (targetDate) => targetDate.toDateString() === currentDate.toDateString()
      );

      let label = "";
      if (matchIndex !== -1) {
        label = `H${matchIndex + 1}`;
      } else {
        let lastTarget;

        if (currentDate.getTime() < targetDates[0].getTime()) {
          lastTarget = targetDates[targetDates.length - 2];
        } else {
          lastTarget = targetDates[targetDates.length - 1];
        }

        const diffTime = currentDate.getTime() - lastTarget.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        label = "H";
        if (diffDays > 0) {
          label += ` + ${diffDays}`;
        } else {
          label += ` - ${Math.abs(diffDays)}`;
        }
      }

      acc[label] = data;
    }

    return acc;
  }, {} as Record<string, AggregateItem>);
}
