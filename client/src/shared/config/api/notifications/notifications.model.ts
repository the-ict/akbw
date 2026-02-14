export interface NotificationResponse {
  data: INotification[];
  ok: boolean;
}

export interface INotification {
  id: number;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
