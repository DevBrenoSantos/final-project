export default interface Dao<T> {
  get: (id: number) => T | null;
  getAll: () => T[];
  insert: (t: T) => void;
  update: (t: T) => void;
  delete: (id: number) => void;
}