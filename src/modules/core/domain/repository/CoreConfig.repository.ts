export abstract class CoreConfigRepository {
  public abstract getConfig(key: string): Promise<string[]>;
}
