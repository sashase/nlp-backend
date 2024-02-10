export interface SourceService<T> {
  fetch(dto: T): Promise<void>
}