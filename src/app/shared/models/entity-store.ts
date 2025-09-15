import { computed, signal } from '@angular/core';
import { Thing } from './thing.model';

/**
 * Generic EntityStore for managing collections of Things.
 * Inspired by NgRx Entity but using Map + Angular Signals.
 * Provides reactive state management with optimal performance.
 */
export abstract class EntityStore<T extends Thing> {
  protected readonly entities = signal<Map<string, T>>(new Map());

  /** Returns the complete Map (readonly) */
  protected readonly all = this.entities.asReadonly();

  /** Returns all entities as an array (computed signal) */
  protected readonly allList = computed(() =>
    Array.from(this.entities().values())
  );

  /** Returns the total count of entities (computed signal) */
  protected readonly count = computed(() => this.entities().size);

  /** Returns whether the store is empty (computed signal) */
  protected readonly isEmpty = computed(() => this.entities().size === 0);

  /** Returns all entity IDs as an array (computed signal) */
  protected readonly allIds = computed(() =>
    Array.from(this.entities().keys())
  );

  /**
   * Gets an entity by _id
   * @param id - Entity identifier
   * @returns Entity or undefined if not found
   */
  getById(id: string): T | undefined {
    return this.entities().get(id);
  }

  /**
   * Gets an entity by _id as a computed signal
   * @param id - Entity identifier
   * @returns Computed signal with entity or undefined
   */
  getByIdSignal(id: string) {
    return computed(() => this.entities().get(id));
  }

  /**
   * Checks if an entity exists
   * @param id - Entity identifier
   * @returns Boolean indicating existence
   */
  hasEntity(id: string): boolean {
    return this.entities().has(id);
  }

  /**
   * Filters entities based on a predicate function
   * @param predicate - Function to test each entity
   * @returns Computed signal with filtered entities
   */
  selectWhere(predicate: (entity: T) => boolean) {
    return computed(() => this.allList().filter(predicate));
  }

  /**
   * Finds the first entity matching a predicate
   * @param predicate - Function to test each entity
   * @returns Computed signal with the first matching entity or undefined
   */
  selectFirst(predicate: (entity: T) => boolean) {
    return computed(() => this.allList().find(predicate));
  }

  /**
   * Replaces all entities
   * @param items - Array of entities to set
   */
  setAll(items: T[]): void {
    const map = new Map<string, T>();
    items.forEach((item) => map.set(item._id, item));
    this.entities.set(map);
  }

  /**
   * Adds a single entity
   * @param item - Entity to add
   */
  addOne(item: T): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      copy.set(item._id, item);
      return copy;
    });
  }

  /**
   * Adds multiple entities
   * @param items - Array of entities to add
   */
  addMany(items: T[]): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      items.forEach((item) => copy.set(item._id, item));
      return copy;
    });
  }

  /**
   * Updates a single entity
   * @param update - Partial entity with _id for updating
   */
  updateOne(update: Partial<T> & { _id: string }): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      const existing = copy.get(update._id);
      if (existing) {
        copy.set(update._id, { ...existing, ...update });
      }
      return copy;
    });
  }

  /**
   * Updates multiple entities
   * @param updates - Array of partial entities with _ids for updating
   */
  updateMany(updates: (Partial<T> & { _id: string })[]): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      updates.forEach((update) => {
        const existing = copy.get(update._id);
        if (existing) {
          copy.set(update._id, { ...existing, ...update });
        }
      });
      return copy;
    });
  }

  /**
   * Upserts a single entity (add or update)
   * @param item - Entity to upsert
   */
  upsertOne(item: T): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      copy.set(item._id, item);
      return copy;
    });
  }

  /**
   * Upserts multiple entities (add or update)
   * @param items - Array of entities to upsert
   */
  upsertMany(items: T[]): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      items.forEach((item) => copy.set(item._id, item));
      return copy;
    });
  }

  /**
   * Removes a single entity
   * @param id - Entity identifier to remove
   */
  removeOne(id: string): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      copy.delete(id);
      return copy;
    });
  }

  /**
   * Removes multiple entities
   * @param ids - Array of entity identifiers to remove
   */
  removeMany(ids: string[]): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      ids.forEach((id) => copy.delete(id));
      return copy;
    });
  }

  /**
   * Removes entities based on a predicate function
   * @param predicate - Function to test each entity for removal
   */
  removeWhere(predicate: (entity: T) => boolean): void {
    this.entities.update((current) => {
      const copy = new Map(current);
      for (const [id, entity] of copy.entries()) {
        if (predicate(entity)) {
          copy.delete(id);
        }
      }
      return copy;
    });
  }

  /**
   * Clears all entities from the store
   */
  clear(): void {
    this.entities.set(new Map());
  }

  /**
   * Gets the current state as a plain object (for debugging)
   * @returns Object with store metadata and entities
   */
  getState() {
    return {
      entities: Object.fromEntries(this.entities()),
      count: this.count(),
      isEmpty: this.isEmpty(),
      ids: this.allIds(),
    };
  }
}
