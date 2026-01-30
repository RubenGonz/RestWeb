export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statucCode?: number
  ) {
    super(message)
  }
}