export default class ValidationError {
  constructor(
    public readonly message: string,
    public readonly entityId: string,
    public readonly field: string,
  ) {}
}
