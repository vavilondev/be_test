export abstract class BaseMapper<S, T, K = unknown> {
    public toDtos(entities: S[], data?: K): T[] {
      return entities.map((entity) => {
        const dto = this.toDto(entity, data) as T & { isInList: boolean };
        dto.isInList = true;
        return dto;
      });
    }
  
    public abstract toDto(entity: S, data?: K): T;
  }
  