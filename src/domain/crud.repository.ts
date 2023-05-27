export abstract class CrudRepositoryInterface<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract insert(entity: T): Promise<T>;
  abstract update(id: string, entity: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
