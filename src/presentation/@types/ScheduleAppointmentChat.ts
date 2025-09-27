type MessageType = "bot" | "user";

export type IScheduleAppointmentChatMessage = {
  id: string;
  type: MessageType;
  content?: string;
  component?: React.ReactNode;
};
