export abstract class CrudRepositoryInterface<T> {
  abstract findAll(userId: string): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract insert(entity: T): Promise<T>;
  abstract update(id: string, entity: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
