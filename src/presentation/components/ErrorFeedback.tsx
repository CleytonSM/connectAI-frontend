interface IErrorFeedbackProps {
  message: string;
}

export const ErrorFeedback = ({ message }: IErrorFeedbackProps) => {
  return (
    <div className="w-full flex flex-col gap-1 items-center">
      <p className="font-bold text-xl break-all">{message}</p>
      <span className="text-sm">Tente novamente mais tarde</span>
    </div>
  );
};
