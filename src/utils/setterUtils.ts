// Utilitário para métodos setter genéricos com tipagem segura
export class SetterUtils {
  /**
   * Cria um método setter genérico para qualquer propriedade
   */
  static createSetter<T, K extends keyof T>(target: T, property: K, value: T[K]): void {
    target[property] = value;
  }

  /**
   * Cria um método setter que valida o tipo antes de atribuir
   */
  static createTypedSetter<T, K extends keyof T>(
    target: T,
    property: K,
    value: T[K],
    validator?: (value: T[K]) => boolean,
  ): void {
    if (validator && !validator(value)) {
      throw new Error(`Valor inválido para propriedade ${String(property)}`);
    }
    target[property] = value;
  }

  /**
   * Cria um método setter que notifica sobre mudanças
   */
  static createNotifyingSetter<T, K extends keyof T>(
    target: T,
    property: K,
    value: T[K],
    onPropertyChange?: (property: K, oldValue: T[K], newValue: T[K]) => void,
  ): void {
    const oldValue = target[property];
    target[property] = value;
    onPropertyChange?.(property, oldValue, value);
  }
}
