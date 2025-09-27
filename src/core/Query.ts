export interface IQuery<ExParams, UpParams, Response> {
  execute: (params: ExParams) => Promise<Response>;
  update: (params: UpParams) => Promise<void>;
}
