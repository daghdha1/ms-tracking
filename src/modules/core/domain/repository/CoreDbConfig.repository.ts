export abstract class CoreDbConfigRepository {
  public abstract getConfig(key: string): Promise<string[]>;
}
