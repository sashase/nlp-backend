export interface SourceService {
  fetch(...args: any[]): Promise<void>
}