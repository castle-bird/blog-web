type LoadingProps = {
  message?: string;
};

const Loading = ({message = "불러오는 중..."}: LoadingProps) => (
    <p className="px-4 py-8 text-sm text-muted-foreground">{message}</p>
);

export default Loading;
