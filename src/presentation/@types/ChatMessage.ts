type MessageType = "bot" | "user";

export interface IChatMessage {
  id: string;
  type: MessageType;
  content?: string;
  component?: React.ReactNode;
}
