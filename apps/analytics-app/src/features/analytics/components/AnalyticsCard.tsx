interface Props {
  title: string;
  value: string;
}

const AnalyticsCard = ({ title, value }: Props) => {
  return (
    <div className="rounded-3xl border border-app-border bg-app-surface p-5">
      <p className="text-sm text-app-text-muted">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-app-text">
        {value}
      </h2>
    </div>
  );
};

export default AnalyticsCard;